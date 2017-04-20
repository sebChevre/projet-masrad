app.controller('UserDetailCtrl',function($state,$http,$scope,AuthService,NotifyService,API_USER_URL) {

    var userDetail = this;
    userDetail.user = AuthService.user;
    userDetail.title = "Détail utilisateur : " + userDetail.user.name;
    userDetail.isUpdateMode = true;     //mode update
    userDetail.isReadOnly = true;

    //déblocage des champs du formulaire
    userDetail.update = function () {
        userDetail.isReadOnly = false;
    }


    userDetail.submit = function () {

        return $http({
            method: 'PATCH',
            url: API_USER_URL  + "/" + userDetail.user.id,
            data: userDetail.user
        }).then(function successCallback(response) {

            NotifyService.showSucess('Utilisateur modifié avec succès');
            $state.go('home');

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