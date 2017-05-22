app.factory('UsersService', ['$http', '$rootScope', function ($http, $rootScope, store, UtilsService) {

    var url = null;

    function fetchAllUsers(page, items) {
        page = page || 1; // Start from page 1
        items = items || [];
        // GET the current page
        return $http({
            url: url,
            params: {
                page: page,
                pageSize: 50
            }
        }).then(function (res) {
            if (res.data.length) {
                // If there are any items, add them
                // and recursively fetch the next page
                items = items.concat(res.data);
                return fetchAllUsers(page + 1, items);
            }
            return items;
        }).catch(function (error) {
            console.log('[UsersService] - getAllUsers error');
            console.log(error); //tableau vide
            $rootScope.$emit('allUsersFound', []);
        });
    }

    var service = {

        getAllUsers: function (lru) {
            url = lru;
            console.log('[UsersService] - getAllUsers with pagination');
            fetchAllUsers().then(function (allUsers) {
                $rootScope.$emit('allUsersFound', allUsers);
            });
        },
        addUserInStaff: function(lru, user) {
            console.log('[UsersService] - add staff role to the user');
            url = lru + "/" + user.id;
            $http({
                method: 'PATCH',
                url: url,
                data: {
                    "roles": ["citizen","staff"]
                }
            }).then(function (res) {
                console.log('[UsersService] - addStaffUser found');
                console.log(res);
                $rootScope.$emit('addStaffUser', res.data);
            }).catch(function (error) {
                console.log('[UsersService] - addStaffUser error');
                console.log(error); //tableau vide
                $rootScope.$emit('addStaffUser', []);
            });            
        }
    };

    return service;
}]);
