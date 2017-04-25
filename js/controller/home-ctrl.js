/*
  Controlleur principal de l'application, hors aspect gestion utilisateurs
 */
app.controller('HomeCtrl', function (AuthService, NotifyService, $state, $scope) {

    var home = this;

    //Récupération des informations de l'utilsateur connecté
    if(AuthService.isLogged()) {
        home.username = AuthService.user.name;
        home.userRoles = AuthService.user.roles;
    } 

    //fonction de logout
    home.logout = function () {
        AuthService.unsetLogged();
        NotifyService.showSucess("Deconnecté avec succès");
        $state.go('home');
    };

    //définit si l'utilisateur à le role staff
    home.hasUserStaffRight = function () {
        return userRoleContainsStaff();
    };

    
    home.isLogged = function(){
        if(AuthService === null) {
            return false;
        }

        console.log("----------- logged ----------------");
        console.log(AuthService.isLogged);
        return AuthService.isLogged;
    };
    
    var userRoleContainsStaff = function () {
        if(AuthService.isLogged()) {
            var hasStaffRole = false;

            var staffRoles = home.userRoles.filter(function (e) {
                return e === 'staff';
            });

            return staffRoles.length > 0;
        } else {
            return false;
        }
    }

});