app.controller('LoginCtrl', function (AuthService, NotifyService, LocationService, $scope, $http, $state, API_LOGIN_URL) {

    $scope.init = function () {
        console.log("scope init");

    };

    $scope.init();


    var login = this;
    login.user = {};
    login.submiting = false;    //définit si le formulaire est en soumission (ajax)

    var logged = false;

    login.submit = function () {

        login.submiting = true;

        $http({
            method: 'POST',
            url: API_LOGIN_URL,
            data: login.user
        }).then(function (res) {
            AuthService.setLogged(res.data.token, res.data.user);
            NotifyService.showSucess('Connexion effectué avec succès!');
            LocationService.setCurrentPosition();
            logged = true;
            $state.go('home');
        }).catch(function (error) {
            NotifyService.showFail('Login et/ou mot de passe érroné');
            login.submiting = false;
            clearFields();
        });

    };

    var clearFields = function () {
        login.user = {};
        $scope.loginForm.$setPristine();  //raz validation
    }

});