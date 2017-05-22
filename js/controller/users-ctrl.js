/*
 * Controlleur pour la gestion des droits utilisateurs
 */
app.co
app.controller('UsersCtrl', function (UsersService, $scope, $rootScope, API_USER_URL) {
    var users = this;
    users.all = [];

    var $allUsersLoaded = $('#all-users-loaded');

    $scope.init = function () {
        console.log('[UsersCtrl] - Init');
        UsersService.getAllUsers(API_USER_URL);
        $allUsersLoaded.show();
    };

    $scope.isLoaded = function () {
        return loaded;
    }

    users.addInStaff = function (us) {
        console.log("[UsersCtrl] - Add this user in the staff, user.name=" + us.name);
        UsersService.addUserInStaff(API_USER_URL, us);
    }

    /* ecoute de l'événement emis par le service de recherche des users - getAllUsers */
    var allUsersListener = $rootScope.$on('allUsersFound', function (event, args) {
        console.log('[UsersCtrl] - All users received');
        users.all  = args;
        addStaffInfo();
        $allUsersLoaded.hide();
        console.log("Users' number=" + users.all.length);
    });

    /* ecoute de l'événement emis par le service users - addStaffUser */
    var allUsersListener = $rootScope.$on('addStaffUser', function (event, args) {
        console.log('[UsersCtrl] - addStaffUser received, update user=' + args);
        updateUsersList(args);
        addStaffInfo();
    });

    function updateUsersList(user) {
        for(i=0; i<users.all.length; i++) {
            if(users.all[i].id === user.id) {
                users.all[i] = user;
            } 
        }
    }


    function addStaffInfo() {
        for(i=0; i<users.all.length; i++) {
            if(users.all[i].roles.indexOf("staff") >= 0) {
                users.all[i].instaff = true;
            } else {
                users.all[i].instaff = false;
            }

        }
    }

});