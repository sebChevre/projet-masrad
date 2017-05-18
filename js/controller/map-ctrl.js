/*
  Controlleur de la map de l'application
 */


app.controller('MapCtrl', ['leafletData','$rootScope','$scope','LocationService', function (leafletData, $rootScope, $scope,LocationService) {

    var map = this;

    var mapOpb = null;

    leafletData.getMap().then(function(lfMap) {
        mapObj = lfMap;
    });


    var destroyPositionFoundListener;


    //centrage sur position courante

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
    // Defines the markers that will be added to the map.
    // Add any marker object to this array for it to appear on the map
    /*map.markers = [
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
    ];*/



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

    $scope.$on('$destroy', function() {
        console.log('destroy home');
        userPositionListener(); // remove listener.
    });

    // Event listener to react to user clicking the map
    $scope.$on('leafletDirectiveMap.click', function (event, args) {
        alert('Map clicked at coordinates [' + args.leafletEvent.latlng.lat + ', ' + args.leafletEvent.latlng.lng + ']')
    })

    $scope.$on('leafletDirectiveMap.leaflet-zone.click', function (event, args) {
        console.log('Map clicked at coordinates [' + args.leafletEvent.latlng.lat + ', ' + args.leafletEvent.latlng.lng + ']')
    })


    // Event listener to react to user clicking a marker
    $scope.$on('leafletDirectiveMarker.click', function (events, args) {
        alert('Marker clicked: ' + args.model.name)
    })

    // Event listener to react to user finishing dragging a marker
    $scope.$on('leafletDirectiveMarker.dragend', function (events, args) {
        alert('Marker moved to coordinates [' + args.model.lat + ', ' + args.model.lng + ']')
    })
}]);