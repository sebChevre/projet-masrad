var app = angular.module('app', ['ui.router', 'angular-storage','cgNotify','ngGeolocation','leaflet-directive']);

app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');



   // $httpProvider.defaults.transformRequest.push(spinnerFunction);

    $stateProvider
    .state('home', {
        url: '',
        templateUrl: './templates/home.html',
        controller: 'HomeCtrl as home'
    });

    // After home state
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: './templates/login.html',
        controller: 'LoginCtrl as login'
    });

	
    $stateProvider.state('signin', {
        url: '/signin',
        templateUrl: './templates/user-detail.html',
        controller: 'UserSigninCtrl as userDetail'

    });

    $stateProvider.state('user-detail', {
        url: '/user-detail',
        templateUrl: './templates/user-detail.html',
        controller: 'UserDetailCtrl as userDetail'

    });

    $urlRouterProvider.otherwise(function($injector) {
        $injector.get('$state').go('home');
    });
});

app.run(function(AuthService, $rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function(event, toState) {
        if (!AuthService.token && nonProtectedRoute(toState)) {
            event.preventDefault();
            $state.go('login');
        }
    });

    var nonProtectedRoute = function (toState) {
        return toState.name !== 'login' && toState.name !== 'signin';
    }
});