/*
  Controlleur de la map de l'application
 */
app.controller('MapCtrl', function (IssuesService, AuthService, NotifyService, LocationService, ModalService, UtilsService, $stateParams, $state, $scope, $rootScope, $geolocation, API_ALL_ISSUES, API_NEW_ISSUES, API_ISSUES_TYPE) {

    var map = this;
    var issuesType = [];
    var currentZoom = 17;
    $scope.complexResult = null;
    map.markers = [];

    map.center = {
        lat: 0,
        lng: 0,
        zoom: currentZoom
    };

    map.defaults = {
        doubleClickZoom: false,
        scrollWheelZoom: true,
        dragging: true,
        minZoom: 1,
        maxZoom: 18
    };

    $scope.init = function () {

        IssuesService.findAllIssues(API_ALL_ISSUES);
        IssuesService.getIssuesType(API_ISSUES_TYPE);
    };


    // Call the modal window
    $scope.showNewIssue = function (lat, lon) {
        console.log("list of type=" + issuesType);
        ModalService.showModal({
            templateUrl: "templates/newIssue.html",
            controller: "ModalInstanceCtrl",
            inputs: {
                title: "Saisie d'une nouvelle issue",
                latitude: lat,
                longitude: lon,
                types: issuesType,
                selectedType: null
            }
        }).then(function (modal) {
            modal.element.modal();
            modal.close.then(function (result) {
                $scope.complexResult = "Name: " + result.name
                    + ", latitude: " + result.latitude
                    + ", longitude:" + result.longitude
                    + ", selectedType:" + result.selectedType;
                if (UtilsService.isUndefinedOrNull(result) || UtilsService.isUndefinedOrNull(result.name) || UtilsService.isUndefinedOrNull(result.latitude) || UtilsService.isUndefinedOrNull(result.longitude) || UtilsService.isUndefinedOrNull(result.selectedType)) {
                    console.log("Cannot insert a new Issue, the content of result isnt valid.")
                } else {
                    console.log(result);
                    map.addNewIssue(result);
                    IssuesService.insertNewIssue(result, API_NEW_ISSUES);
                }
            });
        });
    };

    // Icone par defaut, position actuelle
    var defaultIcon = {
        iconUrl: "assets/leaflet/images/marker-icon.png",
        shadowUrl: "assets/leaflet/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
    };

    var pointsIcon = {
        iconUrl: "assets/img/gps_points.png",
        shadowUrl: "assets/leaflet/images/marker-shadow.png",
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
    };

    map.addNewIssue = function (result) {
        var latitude = result.latitude;
        var longitude = result.longitude;

        map.markers.push({
            name: result.name,
            lat: latitude,
            lng: longitude,
            icon: pointsIcon,
        })

        map.center = {
            lat: latitude,
            lng: longitude,
            zoom: currentZoom
        };
        
    }


    var userPositionListener = $rootScope.$on('userLocated', function (event, args) {

        var lat = LocationService.userPosition.coords.latitude;
        var lng = LocationService.userPosition.coords.longitude;

        map.markers.push({
            lat: lat,
            lng: lng,
            icon: defaultIcon,
            draggable: false,
            focus: true,
            zoom: currentZoom,
            message: '<h3>Vous êtes ici...</h3>',
        });

        map.center = {
            lat: lat,
            lng: lng,
            zoom: currentZoom
        };
    });

    var showIssues = function (issue) {
        var lng = issue.location.coordinates[0];
        var lat = issue.location.coordinates[1];

        map.markers.push({
            lat: lat,
            lng: lng,
            icon: pointsIcon,
            draggable: false,
            focus: true,
            message: '<h4>' + issue.description + '</h4>',
        });

        map.center = {
            lat: lat,
            lng: lng,
            zoom: currentZoom
        };
    }

    $rootScope.$on('showIssuesClicked', function (event, issue) {
        showIssues(issue);
    });

    $rootScope.$on('issueTypeFound', function (event, issTypes) {
        console.log('issueTypeFound=' + issTypes);
        issuesType = issTypes;
    });



    $scope.$on('$destroy', function () {
        console.log('destroy home');
        userPositionListener(); // remove listener.
    });

    // Event listener to react to user clicking the map
    $scope.$on('leafletDirectiveMap.leaflet-zone.click', function (event, args) {
        console.log("create new issue, event=" + event + ", list of type=" + issuesType);
        console.log('Map clicked at coordinates [' + args.leafletEvent.latlng.lat + ', ' + args.leafletEvent.latlng.lng + ']');
        $scope.showNewIssue(args.leafletEvent.latlng.lat, args.leafletEvent.latlng.lng);

    });

    // Event listener to react to user finishing dragging a marker
    $scope.$on('leafletDirectiveMarker.dragend', function (events, args) {
        console.log('Marker moved to coordinates [' + args.model.lat + ', ' + args.model.lng + ']');
    });

    // Save the zoom level after a zoom-change
    $scope.$on('leafletDirectiveMap.leaflet-zone.zoomend', function (events, args) {
        console.log('Zoom Changed [args=' + map.center.zoom + ']');
        currentZoom = map.center.zoom;
    });

   /*
    function objToString(obj) {
        var str = '';
        for (var p in obj) {
            if (obj.hasOwnProperty(p)) {
                str += p + '::' + obj[p] + '\n';
            }
        }
        return str;
    }
    */

});


