/*
  Controlleur de la map de l'application
 */
app.controller('IssuesCtrl', function (AuthService, NotifyService, $state, $scope, $geolocation) {
    var issues = this;

    // do something with filter and request service
});

app.controller('MapCtrl', function (AuthService, NotifyService, $stateParams, $state, $scope, $geolocation) {

    var map = this;


    map.location = $geolocation.getCurrentPosition()
        .then(function (position) {
            // This will be executed when the location is accessed
            console.log(position)
        }, function (error) {
            // This will be executed if the user denies access
            // or the browser doesn't support the Geolocation API
            console.log(error);
        })



    map.center = {
        lat: 46.778474,
        lng: 6.641183,
        zoom: 15
    };

    map.defaults = {
        doubleClickZoom: false, // disable the double-click zoom
        scrollWheelZoom: true, // disable zooming with the scroll
        dragging: true, // disable moving the map with dragging it with the mouse
        minZoom: 10, // Limit the minimal zoom
        maxZoom: 16 // Limit the maximal zoom
    };

});