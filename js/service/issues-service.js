app.factory('IssuesService', ['$http', '$rootScope', function ($http, $rootScope, store, UtilsService) {

    var url = null;
    var longitude = null;
    var latitude = null;
    var radius = null;

    function fetchAllItems(page, items) {
        page = page || 1; // Start from page 1
        items = items || [];
        // GET the current page
        return $http({
            url: url,
            params: {
                page: page,
                pageSize: 50
            }
        }).then(function (res) {
            if (res.data.length) {
                // If there are any items, add them
                // and recursively fetch the next page
                items = items.concat(res.data);
                return fetchAllItems(page + 1, items);
            }
            return items;
        }).catch(function (error) {
            console.log('[IssuesService] - findAllIssues error');
            console.log(error); //tableau vide
            $rootScope.$emit('allIssuesFound', []);
        });
    }

    var service = {

        findAllIssues: function (lru) {
            url = lru;
            console.log('[IssuesService] - findAllIssues with pagination');
            fetchAllItems().then(function (allItems) {
                $rootScope.$emit('allIssuesFound', allItems);
            });
        },
        findMyIssues: function (lru) {
            url = lru;
            console.log('[IssuesService] - finMyIssues with pagination found');
            fetchAllItems().then(function (allItems) {
                $rootScope.$emit('myIssuesFound', allItems);
            });
        },
        insertNewIssue: function (issue, url) {
            var issueToSave = {};
            issueToSave.description = issue.name;

            issueToSave.createdAt = new Date().toString();
            issueToSave.issueTypeHref = issue.selectedType;
            issueToSave.location = {};
            issueToSave.location.type = 'Point';
            issueToSave.location.coordinates = [];
            issueToSave.location.coordinates.push(issue.longitude);
            issueToSave.location.coordinates.push(issue.latitude);
            console.log(issueToSave);

            $http.post(url, issueToSave)
                .then(function (success) {
                    $rootScope.$emit('issueCreated');

                }, function (error) {
                    consolelog(error.data);
                });

        },
        getIssuesType: function (url) {
            $http({
                method: 'GET',
                url: url
            }).then(function (res) {
                console.log('[IssuesService] - findIssuesType found');
                console.log(res);
                $rootScope.$emit('issueTypeFound', res.data);
            }).catch(function (error) {
                console.log('[IssuesService] - findIssuesType error');
                console.log(error); //tableau vide
                $rootScope.$emit('issueTypeFound', []);
            });
        },
        addIssuesType: function (url, name, description) {
            var issueTypeToSave = {};
            issueTypeToSave.name = name;
            issueTypeToSave.description = description;
            $http.post(url, issueTypeToSave)
                .then(function (res) {
                    $rootScope.$emit('issueTypeCreated', res.data);
                }, function (error) {
                    $rootScope.$emit('issueTypeCreated', []);
                    consolelog(error.data);
                });
        }
    };

    return service;
}]);
