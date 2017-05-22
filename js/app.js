
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

    //détail utilisateur
    $stateProvider.state('users', {
        url: '/users',
        templateUrl: './templates/users.html',
        controller: 'UsersCtrl as users'

    });

    //détail types
    $stateProvider.state('types', {
        url: '/types',
        templateUrl: './templates/types.html',
        controller: 'TypesCtrl as types'
    });

    $urlRouterProvider.otherwise(function($injector) {
        $injector.get('$state').go('home');
    });
});

app.run(function(AuthService, $rootScope, $state) {

    $rootScope.$on('$stateChangeStart', function(event, toState) {
        //si pas connecté et url différente des routes non protégées --> login
        if (!AuthService.token && nonProtectedRoute(toState)) {
            event.preventDefault();
            $state.go('login');
        }
        //access zone staff
        if(AuthService.token && staffRoutes(toState) && !AuthService.isStaff()){
            $state.go('home');
        }
    });

    var nonProtectedRoute = function (toState) {
        return toState.name !== 'login' && toState.name !== 'signin';
    };

    var staffRoutes = function (toState) {
        return toState.name === 'users' || toState.name === 'types';
    };


});