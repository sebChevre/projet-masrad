/*
  Controlleur de la map de l'application
 */
app.controller('IssuesCtrl', function (AuthService, NotifyService, LocationService, $state, $scope, $geolocation) {
    var issues = this;

    // do something with filter and request service
});

app.controller('MapCtrl', function (AuthService, NotifyService, LocationService, ModalService, UtilsService, $stateParams, $state, $scope, $geolocation) {

    var map = this;

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
                }

            });
        });

    };

    map.center = {
        lat: LocationService.latitude,
        lng: LocationService.longitude,
        zoom: 15
    };


    map.defaults = {
        doubleClickZoom: false, // disable the double-click zoom
        scrollWheelZoom: true, // disable zooming with the scroll
        dragging: true, // disable moving the map with dragging it with the mouse
        minZoom: 10, // Limit the minimal zoom
        maxZoom: 16 // Limit the maximal zoom
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

    // Defines a custom icon
    var myIcon = {
        iconUrl: "images/myIcon.png",
        iconSize: [38, 95],
        iconAnchor: [22, 95],
        shadowUrl: "images/myIconShadow.png",
        shadowSize: [50, 64],
        shadowAnchor: [5, 64]
    };

    // Defines the markers that will be added to the map.
    // Add any marker object to this array for it to appear on the map
    map.markers = [
        {
            lat: 46.781547,
            lng: 6.640351,
            icon: defaultIcon,
            draggable: true,
            // You can add any additionnal property you want to your marker
            // This way, we can for example add a name to identify the marker later on.
            name: 'Yverdon gare'
        }, {
            lat: 46.781058,
            lng: 6.647179,
            icon: defaultIcon,
            name: 'HEIG-VD, St-Roch'
        }, {
            lat: 46.778246,
            lng: 6.641490,
            icon: defaultIcon,
            name: 'Place Pestalozzi'
        }
    ];

    // This function adds a new marker to the map.markers array
    // and, consequently, to the map
    // Calling it multiple time will add the same marker each time.
    map.addMarker = function () {
        map.markers.push({
            lat: 46.779244,
            lng: 6.659402,
            icon: myIcon,
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

    // Event listener to react to user clicking the map
    $scope.$on('leafletDirectiveMap.click', function (event, args) {
        console.log("create new issue, event=" + event);
        console.log('Map clicked at coordinates [' + args.leafletEvent.latlng.lat + ', ' + args.leafletEvent.latlng.lng + ']');
        //alert('Map clicked at coordinates [' + args.leafletEvent.latlng.lat + ', ' + args.leafletEvent.latlng.lng + ']')
        $scope.showNewIssue(args.leafletEvent.latlng.lat, args.leafletEvent.latlng.lng);

    })

    // Event listener to react to user clicking a marker
    $scope.$on('leafletDirectiveMarker.click', function (events, args) {

        console.log('Marker clicked: ' + args.model.name);
        //alert('Marker clicked: ' + args.model.name)
    })

    // Event listener to react to user finishing dragging a marker
    $scope.$on('leafletDirectiveMarker.dragend', function (events, args) {
        console.log('Marker moved to coordinates [' + args.model.lat + ', ' + args.model.lng + ']');
        //alert('Marker moved to coordinates [' + args.model.lat + ', ' + args.model.lng + ']')
    })

});
