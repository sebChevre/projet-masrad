/*
 * Controlleur pour la creation d'un nouvel utilisateur
 */
app.controller('UserSigninCtrl',function($scope, AuthService, NotifyService, $http, $state, API_USER_URL) {

    var userDetail = this;

    userDetail.title = "Création compte";

    userDetail.user = {};

    userDetail.isUpdateMode = false;

    userDetail.cancel = function (){
        $state.go('home');
    };

    userDetail.submit = function () {

            console.log();

            //definition des rôles, uniquement citizen
            var roles = [];
            roles.push('citizen');
            userDetail.user.roles = roles;

            console.log(userDetail.user);

            return $http({
                method: 'POST',
                url: API_USER_URL,
                data: userDetail.user
            }).then(function successCallback(response) {

                NotifyService.showSucess('Utilisateur créé avec succès');
                $state.go('login');

            }, function errorCallback(response) {

                //401 non authorisé
                //404 not found
                NotifyService.showFail('Erreur durant la création de l\'utilisateur');
                clearFields();

            });
    };


    var clearFields = function () {
        userDetail.user = {};
        $scope.signinForm.$setPristine();  //raz validation
    }






});