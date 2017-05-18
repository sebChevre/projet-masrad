app.controller('ModalInstanceCtrl', [
    '$scope', '$element', 'title', 'close', 'latitude', 'longitude', 'types', 'selectedType',
    function ($scope, $element, title, close, latitude, longitude, types, selectedType) {

        $scope.name = null;
        $scope.title = title;
        $scope.latitude = latitude;
        $scope.longitude = longitude;
        $scope.types = types
        $scope.selectedType = null;

        //  This close function doesn't need to use jQuery or bootstrap, because
        //  the button has the 'data-dismiss' attribute.
        $scope.close = function () {
            close({
                name: $scope.name,
                latitude: $scope.latitude,
                longitude: $scope.longitude,
                types: $scope.types,
                selectedType: $scope.selectedType
            }, 500); // close, but give 500ms for bootstrap to animate
        };

        //  This cancel function must use the bootstrap, 'modal' function because
        //  the doesn't have the 'data-dismiss' attribute.
        $scope.cancel = function () {

            //  Manually hide the modal.
            $element.modal('hide');

            //  Now call close, returning control to the caller.
            close({
                name: null,
                latitude: null,
                longitude: null,
                types: null,
                selectedType: null
            }, 500); // close, but give 500ms for bootstrap to animate
        };

    }]);