/*
 * Controlleur pour la barre de navigation
 */
app.controller('HeaderCtrl',function(AuthService,NotifyService,LocationService,$state,$scope,$rootScope) {

    var header = this;
    var isGpsPositionDefined = false;

    //Récupération des informations de l'utilsateur connecté
    header.username = AuthService.user.name;
    header.userRoles = AuthService.user.roles;


    $scope.init = function () {
        console.log("scope init");
        LocationService.findUserPosition();
    };

    header.isGpsPositionDefined = function () {
        return isGpsPositionDefined;
    }

    /* recherche si l'utilisateur à le role staff */
    header.hasUserStaffRight = function () {
        return AuthService.isStaff();
    };

    /* fonction de logout */
    header.logout = function () {
        AuthService.unsetLogged();
        NotifyService.showSucess("Déconnecté avec succès");
        $state.go('login');
    };

    /* ecoute de l'événement emis par le service de localisation */
    var userPositionListener = $rootScope.$on('userLocated', function (event, args) {
        console.log('[HeaderCtr] - position found event received');
        isGpsPositionDefined = true;
        $('#position-loader').hide();
    });

    /* on enleve le listener pour eviter une multiplication a chaque instance */
    $scope.$on('$destroy', function() {
        console.log('[HeaderCtr] - Controller destroyed');
        userPositionListener(); // on enleve le listener.
    });

});