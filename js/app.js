
var app = angular.module('app', ['ui.router', 'angular-storage','cgNotify','ngGeolocation','leaflet-directive','angularModalService','ngAnimate']);


app.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    //ajout intercepteur http
    $httpProvider.interceptors.push('AuthInterceptor');

    //routage, page home principale
    $stateProvider
    .state('home', {
        url: '',
        templateUrl: './templates/home.html',
        controller: 'HomeCtrl as home'
    });

    // page de login
    $stateProvider.state('login', {
        url: '/login',
        templateUrl: './templates/login.html',
        controller: 'LoginCtrl as login'
    });

    //creation utilisateur
    $stateProvider.state('signin', {
        url: '/signin',
        templateUrl: './templates/user-detail.html',
        controller: 'UserSigninCtrl as userDetail'

    });

    //détail utilisateur
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