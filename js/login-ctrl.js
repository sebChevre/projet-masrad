angular.module('app').controller('LoginCtrl', function(AuthService, $http, $state) {
  var login = this;

  login.user = {};

  login.connect = function() {
  	delete login.error;
    console.log(login.user);
	  $http({
	    method: 'POST',
	    url: 'https://masrad-dfa-2017-d.herokuapp.com/api/auth',
	    data: login.user
	  }).then(function(res) {
	    AuthService.setToken(res.data.token);
	    $state.go('home');
	  }).catch(function(error) {
  		login.error = "Unable to log you."
    	console.log(error);
  	  });    
  };
});