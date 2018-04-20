(function () {
    'use strict';
    angular.module('managment.dashboard')
        .config(['$stateProvider',
            function ($stateProvider) {
                $stateProvider
                    .state('/', {
                        url: '/',
                        title: 'Dashboard',
                        controller: 'DashboardController',
                        controllerAs: 'vm',
                        templateUrl: 'app/components/dashboard/dashboard.html'
                    })
            }
        ]);
})();