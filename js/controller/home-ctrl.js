/*
  Controlleur principal de l'application, hors aspect gestion utilisateurs
 */
app.controller('HomeCtrl',function(AuthService,NotifyService,$state,$scope) {

    var home = this;

    //Récupération des informations de l'utilsateur connecté
    home.username = AuthService.user.name;
    home.userRoles = AuthService.user.roles;

    //fonction de logout
    home.logout = function () {
        AuthService.unsetLogged();
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