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
        },
        insertNewIssue: function (issue,url){
            var issueToSave = {};
            issueToSave.description = issue.name;

            issueToSave.createdAt = new Date().toString();
            issueToSave.issueTypeHref = "/zduiasdiuas";
            issueToSave.location = {};
            issueToSave.location.type = 'Point';
            issueToSave.location.coordinates = [];
            issueToSave.location.coordinates.push(issue.latitude);
            issueToSave.location.coordinates.push(issue.longitude);

            console.log(issueToSave);

            $http.post(url, issueToSave)
            .then(function (success) {
                callback(success);
            }, function (error) {
                errorCallback(error.data);
            });

        },
        getIssuesType: function (url) {
            $http({
                method: 'GET',
                url: url
            }).then(function (res) {
                console.log('[IssuesService] - findIssuesType found');
                console.log(res);
                $rootScope.$emit('issueTypeFound',res.data);
            }).catch(function (error) {
                console.log('[IssuesService] - findIssuesType error');
                console.log(error); //tableau vide
                $rootScope.$emit('issueTypeFound',[]);
            });
        }
    };


    return service;
}]);
