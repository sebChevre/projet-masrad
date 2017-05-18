/*
  Controlleur de la map de l'application
 */



app.controller('MapCtrl', function (IssuesService,AuthService, NotifyService, LocationService, ModalService, UtilsService, $stateParams, $state, $scope, $rootScope, $geolocation,API_ALL_ISSUES,API_NEW_ISSUES,API_ISSUES_TYPE) {

    var map = this;

    var issuesType = [];

    $scope.init = function () {

        IssuesService.findAllIssues(API_ALL_ISSUES);
        IssuesService.getIssuesType(API_ISSUES_TYPE);
    };

    $scope.complexResult = null;

    // Call the modal window
    $scope.showNewIssue = function (lat, lon) {
        ModalService.showModal({
            templateUrl: "templates/newIssue.html",
            controller: "ModalInstanceCtrl",
            inputs: {
                title: "Saisie d'une nouvelle issue",
                latitude: lat,
                longitude: lon
            }
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (result) {
                $scope.complexResult = "Name: " + result.name + ", latitude: " + result.latitude + ", longitude:" + result.longitude;
                if (UtilsService.isUndefinedOrNull(result) || UtilsService.isUndefinedOrNull(result.name) || UtilsService.isUndefinedOrNull(result.latitude) || UtilsService.isUndefinedOrNull(result.longitude)) {
                    console.log("Cannot insert a new Issue, the content of result isnt valid.")
                } else {
                    map.addNewIssue(result);
                    console.log(result);
                    IssuesService.insertNewIssue(result,API_NEW_ISSUES);
                }

            });
        });

    };


    map.center = {
        lat: 0,
        lng: 0,
        zoom: 5
    };

    map.defaults = {
        doubleClickZoom: false, // disable the double-click zoom
        scrollWheelZoom: true, // disable zooming with the scroll
        dragging: true, // disable moving the map with dragging it with the mouse
        minZoom: 1, // Limit the minimal zoom
        maxZoom: 18 // Limit the maximal zoom
    };


    // Fixes the default Icon bug, see slide #10
    var defaultIcon = {
        iconUrl: "assets/leaflet/images/marker-icon.png",
        shadowUrl: "assets/leaflet/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
    };

    var trackingIcon = {
        iconUrl: "assets/img/bluedot.gif",
        shadowUrl: "assets/leaflet/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
    };

    // Defines a custom icon
    var myIcon = {
        iconUrl: "images/myIcon.png",
        iconSize: [38, 95],
        iconAnchor: [22, 95],
        shadowUrl: "images/myIconShadow.png",
        shadowSize: [50, 64],
        shadowAnchor: [5, 64]
    };



    map.markers = [];


    // This function adds a new marker to the map.markers array
    // and, consequently, to the map
    // Calling it multiple time will add the same marker each time.
    map.addMarker = function () {
        map.markers.push({
            lat: 46.779244,
            lng: 6.659402,
            icon: defaultIcon,
            name: 'HEIG-VD, Cheseaux'
        })
    }


    map.addNewIssue = function (result) {
        map.markers.push({
            name: result.name,
            lat: result.latitude,
            lng: result.longitude,
            icon: myIcon
        })

    }


    var userPositionListener = $rootScope.$on('userLocated', function (event, args) {

        var lat = LocationService.userPosition.coords.latitude;
        var lng = LocationService.userPosition.coords.longitude;



        map.markers.push({
            lat: lat,
            lng: lng,
            icon:defaultIcon,
            draggable: false,
            focus:true,
            message: '<h3>Vous êtes ici...</h3>'
        });

        map.center = {
            lat: lat,
            lng: lng,
            zoom: 18
        };
        console.log(map);


    });

    var showIssues = function (issue) {

        console.log(issue);
        var lat = issue.location.coordinates[0];
        var lng = issue.location.coordinates[1];

        map.markers.push({
            lat: lat,
            lng: lng,
            icon:defaultIcon,
            draggable: false,
            focus:true,
            message: '<h4>' + issue.description +'</h4>'
        });

        map.center = {
            lat: lat,
            lng: lng,
            zoom: 10
        };
    }

    $rootScope.$on('showIssuesClicked',function (event,issue){
        showIssues(issue);
    });

    $rootScope.$on('issueTypeFound',function (event,issTypes){
        console.log(issTypes);
        issuesType = issypes;
    });

    $scope.$on('$destroy', function() {
        console.log('destroy home');
        userPositionListener(); // remove listener.
    });

    // Event listener to react to user clicking the map
    $scope.$on('leafletDirectiveMap.click', function (event, args) {
        console.log("create new issue, event=" + event);
        console.log('Map clicked at coordinates [' + args.leafletEvent.latlng.lat + ', ' + args.leafletEvent.latlng.lng + ']');
        //alert('Map clicked at coordinates [' + args.leafletEvent.latlng.lat + ', ' + args.leafletEvent.latlng.lng + ']')
        $scope.showNewIssue(args.leafletEvent.latlng.lat, args.leafletEvent.latlng.lng);

    })

    $scope.$on('leafletDirectiveMap.leaflet-zone.click', function (event, args) {
        console.log("create new issue, event=" + event);
        console.log('Map clicked at coordinates [' + args.leafletEvent.latlng.lat + ', ' + args.leafletEvent.latlng.lng + ']');
        //alert('Map clicked at coordinates [' + args.leafletEvent.latlng.lat + ', ' + args.leafletEvent.latlng.lng + ']')
        $scope.showNewIssue(args.leafletEvent.latlng.lat, args.leafletEvent.latlng.lng);

    })




    // Event listener to react to user finishing dragging a marker
    $scope.$on('leafletDirectiveMarker.dragend', function (events, args) {
        console.log('Marker moved to coordinates [' + args.model.lat + ', ' + args.model.lng + ']');
        //alert('Marker moved to coordinates [' + args.model.lat + ', ' + args.model.lng + ']')
    })

});


