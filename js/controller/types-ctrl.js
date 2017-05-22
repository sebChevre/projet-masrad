app.controller('TypesCtrl', function (IssuesService, $scope, $rootScope, API_ISSUES_TYPE) {
    var types = this;
    types.all = [];

    var $allTypesLoaded = $('#all-types-loaded');

    $scope.init = function () {
        console.log('[TypesCtrl] - Init');
        IssuesService.getIssuesType(API_ISSUES_TYPE);
        $allTypesLoaded.show();
    };

    types.addType = function () {
        console.log('[TypesCtrl] - addType, name=' + types.new.name + ", description=" + types.new.description);
        IssuesService.addIssuesType(API_ISSUES_TYPE, types.new.name, types.new.description);
    };

    $rootScope.$on('issueTypeFound', function (event, issTypes) {
        console.log('[TypesCtrl] - issueTypeFound=' + issTypes);
        types.all = issTypes;
        $allTypesLoaded.hide();
    });

    $rootScope.$on('issueTypeCreated', function (event, issTypes) {
        console.log('[TypesCtrl] - issueTypeCreated=' + issTypes);
        if (types.all.indexOf(issTypes) >= 0) {
            console.log("IssueType already is in list.");
        } else {
            types.all.push(issTypes);
        }
    });

});