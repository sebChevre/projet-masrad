app.factory('IssuesService',['$http','$rootScope', function($http, $rootScope, store, UtilsService) {

    var service = {

        findAllIssues: function (url) {
            console.log('[IssuesService] - finAllIssues');
            $http({
                method: 'GET',
                url: url
            }).then(function (res) {
                console.log('[IssuesService] - finAllIssues found');
                console.log(res);
                $rootScope.$emit('allIssuesFound',res.data);
            }).catch(function (error) {
                console.log('[IssuesService] - finAllIssues error');
                console.log(error); //tableau vide
                $rootScope.$emit('allIssuesFound',[]);
            });
        },
        findMyIssues: function (url) {
            $http({
                method: 'GET',
                url: url
            }).then(function (res) {
                console.log('[IssuesService] - finMyIssues found');
                console.log(res);
                $rootScope.$emit('myIssuesFound',res.data);
            }).catch(function (error) {
                console.log('[IssuesService] - findMyIssues error');
                console.log(error); //tableau vide
                $rootScope.$emit('myIssuesFound',[]);
            });
        }
    };


    return service;
}]);
