/*
 * Controlleur pour la gestion de la liste des issues
 */
app.co
app.controller('IssuesCtrl', function (IssuesService, $scope, $rootScope, API_ALL_ISSUES, API_MY_ISSUES) {

    var issues = this;
    var $allIssuesLoader = $('#all-issues-loader');
    var $myIssuesLoader = $('#my-issues-loader');

    //gestion des tabs
    $('#allIssuesTabs a, #myIssuesTabs a').click(function (e) {

        var tabName = (e.currentTarget.hash);

        if (tabName === '#my') {
            IssuesService.findMyIssues(API_MY_ISSUES);
            $myIssuesLoader.show();
            $allIssuesLoader.hide();
        } else {
            //$('.issues-panel').remove();
            IssuesService.findAllIssues(API_ALL_ISSUES);
            $allIssuesLoader.show();
            $myIssuesLoader.hide();
        }

        $(this).tab('show');
        e.preventDefault();
    });

    issues.test = function (who) {
        var lat = who.is.location.coordinates[0];
        var lng = who.is.location.coordinates[1];

        console.log(who.is.location.coordinates[0]);

        $rootScope.$emit('showIssuesClicked', who.is);

    }

    issues.all = [];
    issues.my = [];

    $scope.init = function () {
        $('#my-issues-loader').hide();
        console.log('[IssuesController] - Init')
        IssuesService.findAllIssues(API_ALL_ISSUES);
    };

    /* ecoute de l'événement emis par le service de recherche des issues - all */
    var allIssuesListener = $rootScope.$on('allIssuesFound', function (event, args) {
        console.log('[IssuesCtr] - All issues received');
        issues.my = [];
        issues.all = args;
        $allIssuesLoader.hide();
    });

    /* ecoute de l'événement emis par le service de recherche des issues - all */
    var myIssuesListener = $rootScope.$on('myIssuesFound', function (event, args) {
        console.log('[IssuesCtr] - My issues received');
        issues.my = args;
        $myIssuesLoader.hide();
    });

    var myIssueCreatedListener = $rootScope.$on('issueCreated', function (event) {

        IssuesService.findMyIssues(API_MY_ISSUES);
    });
    
    /* on enleve le listener pour eviter une multiplication a chaque instance */
    $scope.$on('$destroy', function () {
        console.log('[IssuesCtr] - Controller destroyed');
        myIssuesListener();
        allIssuesListener();// on enleve le listener.

    });

});
