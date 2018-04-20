(function () {
    'use strict';

    angular.module('managment.shared.route', ['ui.router', 'managment.shared.constant']);

    angular.module('managment.shared.route')
        .config(['$stateProvider', '$urlRouterProvider', '$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {
            $locationProvider.html5Mode(true).hashPrefix('!');

            $urlRouterProvider.otherwise(function ($injector, $location) {
                $injector.invoke(['$state', function ($state) {
                    $state.go('/');
                }]);
            });
            //$stateProvider
            //    .state('/', {
            //        title: 'managment Landing Page',
            //        url: '/',
            //        template: '<div></div>',
            //        controller: function ($window, $location, $rootScope) {
            //            if (!$rootScope.isInitialLoad) {
            //                $window.location = 'home.html';
            //            }
            //        },
            //        requireADLogin: false
            //    });

        }]).run(['$rootScope', '$state', '$location', '$window', 'appSettings', '$timeout', function ($rootScope, $state, $location, $window, appSettings, $timeout) {
            
            // track page view on state change
            $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState) {
                $rootScope.title = $state.current.title;
                
            });
        }]);
})();