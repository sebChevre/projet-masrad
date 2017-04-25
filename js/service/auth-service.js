app.factory('AuthService', function(store, UtilsService) {
  var service = {
    token: store.get('auth-token'),
    user : store.get('auth-user'),
     
    setLogged: function(token,user) {
      service.token = token;
      service.user = user;
      store.set('auth-token', token);
      store.set('auth-user', user)
    },
    unsetLogged: function() {
      service.token = null;
      service.user = null;
      store.remove('auth-token');
      store.remove('auth-user');
    }
  };


  service.isUserLogged = function() {
    if(UtilsService.isUndefinedOrNull(service.token) || UtilsService.isUndefinedOrNull(service.user)){
      return false;
    }
    return true;
  };



  return service;
});