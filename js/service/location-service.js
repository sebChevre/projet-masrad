app.factory('LocationService', function (store, $geolocation) {
    
    

    var service = {
        latitude: store.get('latitude'),
        longitude: store.get('longitude'),

        setLocation: function (position) {
            service.latitude = position.coords.latitude;
            service.longitude = position.coords.longitude;
            store.set('latitude', service.latitude);
            store.set('longitude', service.longitude);
        },

        unsetLocation: function () {
            service.latitude = null;
            service.longitude = null
            store.remove('latitude');
            store.remove('longitude');
        },

        setCurrentPosition : function() {
            $geolocation.getCurrentPosition()
        .then(function (position) {
            // This will be executed when the location is accessed
            service.setLocation(position);
            console.log("========== location found from $geolocation");
        }, function (error) {
            // This will be executed if the user denies access
            // or the browser doesn't support the Geolocation API
            service.latitude = 46.778474;
            service.longitue = 6.641183;
            console.log("========== default location, based on Yverdon");
        });
        }
    };

    return service;
});