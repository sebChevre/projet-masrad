app.factory('AuthService', function(store, UtilsService) {
  var service = {
    token: store.get('auth-token'),
    user : store.get('auth-user'),

    setLogged: function(token,user) {
      this.token = token;
      this.user = user;
      store.set('auth-token', token);
      store.set('auth-user', user)
    },

    unsetLogged: function() {
      this.token = null;
      this.user = null;
      store.remove('auth-token');
      store.remove('auth-user');
    },

    isStaff: function () {
        var hasStaffRole = false;

        var staffRoles = this.user.roles.filter(function (e) {
            return e === 'staff';
        });

        return staffRoles.length > 0;
    }

  };

  return service;
});