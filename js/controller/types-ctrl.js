app.controller('TypesCtrl', function (IssuesService, $scope, $rootScope, API_ISSUES_TYPE) {
    var types = this;
    types.all = [];

    var $allTypesLoaded = $('#all-types-loaded');

    $scope.init = function () {
        console.log('[TypesCtrl] - Init');
        IssuesService.getIssuesType(API_ISSUES_TYPE);
        $allTypesLoaded.show();
    };


    $rootScope.$on('issueTypeFound', function (event, issTypes) {
        console.log('[TypesCtrl] - issueTypeFound=' + issTypes);
        types.all = issTypes;
        $allTypesLoaded.hide();
    });


});