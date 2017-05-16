/*
  Controlleur de la map de l'application
 */
app.controller('IssuesCtrl', function (AuthService, NotifyService, LocationService, $state, $scope, $geolocation) {
    var issues = this;

    // do something with filter and request service
});

app.controller('MapCtrl', function (AuthService, NotifyService, LocationService, $stateParams, $state, $scope, $geolocation) {

    var map = this;
    map.center = {
        lat: LocationService.latitude,
        lng: LocationService.longitude,
        zoom: 18
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

    var currentPositionMarker = {
        lat: LocationService.latitude,
        lng: LocationService.longitude,
        icon:trackingIcon,
        draggable: false,
        // You can add any additionnal property you want to your marker
        // This way, we can for example add a name to identify the marker later on.
        name: 'Current Position'


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

    map.markers.push(currentPositionMarker);

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

    map.addMarker = function () {
        map.markers.push(currentPositionMarker)
    }

    // Event listener to react to user clicking the map
    $scope.$on('leafletDirectiveMap.click', function (event, args) {
        alert('Map clicked at coordinates [' + args.leafletEvent.latlng.lat + ', ' + args.leafletEvent.latlng.lng + ']')
    })

    // Event listener to react to user clicking a marker
    $scope.$on('leafletDirectiveMarker.click', function (events, args) {
        alert('Marker clicked: ' + args.model.name)
    })

    // Event listener to react to user finishing dragging a marker
    $scope.$on('leafletDirectiveMarker.dragend', function (events, args) {
        alert('Marker moved to coordinates [' + args.model.lat + ', ' + args.model.lng + ']')
    })
});