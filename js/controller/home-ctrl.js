app.controller('HomeCtrl',function(AuthService,NotifyService,$state,$scope) {

    var home = this;

    home.username = AuthService.user.name;
    home.userRoles = AuthService.user.roles;

    home.logout = function () {
        AuthService.unsetLogged();
        NotifyService.showSucess("Deconnecté avec succès");
        $state.go('login');
    }

    home.hasUserStaffRight = function () {

        return userRoleContainsStaff();
    }

    var userRoleContainsStaff = function () {
        var hasStaffRole = false;

        for(var role in home.userRoles){
            console.log(home.userRoles[role]);

            if(home.userRoles[role] === 'staff'){
                hasStaffRole = true;
            }
        }

        return hasStaffRole;
    }

});