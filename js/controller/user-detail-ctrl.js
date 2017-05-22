/*
 * Controlleur pour la gestion de la page de détail des utilisateurs, et également pour la saisie d'un nouvel utilisateur
 */
app.controller('UserDetailCtrl',function($state,$http,$scope,AuthService,NotifyService,API_USER_URL) {

    var userDetail = this;
    userDetail.user = AuthService.user;
    userDetail.title = "Détail utilisateur : " + userDetail.user.name;
    userDetail.isUpdateMode = true;     //mode update
    userDetail.isReadOnly = true;


    //gestion des attributs readonly des champs
    userDetail.update = function () {
        userDetail.isReadOnly = false;
    };


    userDetail.cancel = function (){
        userDetail.isReadOnly = true;
    };

    userDetail.submit = function () {

        return $http({
            method: 'PATCH',
            url: API_USER_URL  + "/" + userDetail.user.id,
            data: userDetail.user
        }).then(function successCallback(response) {

            NotifyService.showSucess('Utilisateur modifié avec succès');
            $state.go('issues');

        }, function errorCallback(response) {

            //401 non authorisé
            //404 not found
            NotifyService.showFail('Erreur durant la modification de l\'utilisateur');
            clearFields();

        });
    };


    var clearFields = function () {
        userDetail.user = {};
        $scope.signinForm.$setPristine();  //raz validation
    }

});