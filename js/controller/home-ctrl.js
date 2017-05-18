/*
 * Controlleur principal de l'application, hors aspect gestion utilisateurs
 */
app.controller('HomeCtrl',function(AuthService,NotifyService, LocationService,$state,$scope,$rootScope) {

    var home = this;
    var destroyPositionFoundListener;

    home.isGpsPositionDefined = false;

    $scope.init = function () {
        console.log("scope init");
        LocationService.findUserPosition();
    };

    $scope.init();


    var userPositionListener = $rootScope.$on('userPositionFound', function (event, args) {
        console.log('position home-ctrl')
        home.isGpsPositionDefined = true;
        event.preventDefault();
    });

    $scope.$on('$destroy', function() {
        console.log('destroy home');
        userPositionListener(); // remove listener.
    });



    //Récupération des informations de l'utilsateur connecté
    home.username = AuthService.user.name;
    home.userRoles = AuthService.user.roles;


    //fonction de logout
    home.logout = function () {
        AuthService.unsetLogged();
        //LocationService.unsetLocation();
        NotifyService.showSucess("Deconnecté avec succès");
        $state.go('login');
    };

    //définit si l'utilisateur à le role staff
    home.hasUserStaffRight = function () {
        return userRoleContainsStaff();
    };


    var userRoleContainsStaff = function () {
        var hasStaffRole = false;

        var staffRoles = home.userRoles.filter(function (e) {
            return e === 'staff';
        });

        return staffRoles.length > 0;
    }

});