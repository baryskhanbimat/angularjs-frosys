'use strict';

angular
    .module('app.routes', ['ngRoute'])
    .config(config);

function config ($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'sections/home/home.tpl.html',
            controller: 'HomeController as home'
        })
        .when('/authentication', {
            templateUrl: 'sections/authentication/authentication.tpl.html',
            controller: 'AuthenticationController as auth'
        })
        .when('/desktop', {
            templateUrl: 'sections/desktop/desktop.tpl.html',
            controller: 'DesktopController as desktop'
        })
        .when('/cabinet', {
            templateUrl: 'sections/cabinet/cabinet.tpl.html',
            controller: 'CabinetController as cabinet'
        })
        // .when('/popular', {
        //     templateUrl: 'sections/popular/popular.tpl.html',
        //     controller: 'PopularController as popular',
        //     resolve: {
        //         shows: function(ShowService) {
        //             return ShowService.getPopular();
        //         }
        //     }
        // })
        // .when('/view/:id', {
        //     templateUrl: 'sections/view/view.tpl.html',
        //     controller: 'ViewController as view',
        //     resolve: {
        //         show: function(ShowService, $route) {
        //             return ShowService.get($route.current.params.id);
        //         }
        //     }
        // })
        .otherwise({
            redirectTo: '/'
        });
}
