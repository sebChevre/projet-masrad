angular.module('app').controller('LoginCtrl',function(AuthService, $http, $state,notify) {
  var login = this;
  var notificationMsg  = '';
  var notificationMsgCssClasses = [];
  
  login.user = {};
  
  

  login.connect = function() {
	  console.log(loginForm.password.$valid)
	  
  	delete login.error;
    console.log(login.user);
	  $http({
	    method: 'POST',
	    url: 'https://masrad-dfa-2017-d.herokuapp.com/api/auth',
	    data: login.user
	  }).then(function(res) {
	    AuthService.setToken(res.data.token);
        notificationMsg  = 'Connexion effectué avec succès!';
		otificationMsgCssClasses = [];
        notificationMsgCssClasses.push('alert-success');
		notify({message:notificationMsg,duration:3000,classes:notificationMsgCssClasses});
	    $state.go('home');
	  }).catch(function(error) {
  		login.error = "Unable to log you."
         notificationMsg  = 'Login et/ou mot de passe érroné';
		 otificationMsgCssClasses = [];
         notificationMsgCssClasses.push('alert-danger');
		 notify({message:notificationMsg,duration:3000,classes:notificationMsgCssClasses});
    	console.log(error);
		clearFields();
  	  });    
	  
  };
  
  var clearFields = function () {
      login.user = {};
	  delete login.error;
	  
	  //$scope.password = '';
      //$scope.login = '';
  }
  
});