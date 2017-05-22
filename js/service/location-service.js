app.factory('LocationService', ['$rootScope','$geolocation', function ($rootScope,$geolocation,store) {

    var service = {
        userPosition:null,

        setLocation: function (position) {
            console.log("location passed:")
            console.log(position);
            console.log($geolocation.position);
            console.log($geolocation.position.error);
            console.log(position.error);

            if(!$geolocation.position.error){
                service.latitude = position.coords.latitude;
                service.longitude = position.coords.longitude;
                store.set('latitude', service.latitude);
                store.set('longitude', service.longitude);
            }


        },

        findUserPosition :function () {

            $geolocation.getCurrentPosition({
                timeout: 60000
            }).then(function(position) {
                service.userPosition = position;
                console.log(service.userPosition);
                console.log('[LocationService] - position found and emmited: userLocated' );
                $rootScope.$emit('userLocated');
            }).catch(function (error) {
                console.log(error);
                console.log('position error');
            });

        },

        unsetLocation: function () {
            service.latitude = null;
            service.longitude = null
            store.remove('latitude');
            store.remove('longitude');
        },

        setCurrentPosition : function() {

            console.log("setCurrentPosition")

            $geolocation.getCurrentPosition()
                .then(function (position) {
                    // This will be executed when the location is accessed
                    service.setLocation(position);
                    console.log("========== location found from $geolocation");
                    console.log(position);
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

}]);
