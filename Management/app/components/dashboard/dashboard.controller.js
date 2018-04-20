/**
 * 
 */
(function () {
    'use strict';
    angular.module('managment.dashboard')
        .controller('DashboardController', ['$scope', '$uibModal', '$timeout', '$document', '$translate', '$translatePartialLoader', '$state', '$filter', '$location',
            DashboardController
        ]);

    function DashboardController($scope, $uibModal, $timeout, $document, $translate, $translatePartialLoader, $state, $filter, $location) {
        var vm = this;
        
        vm.test = 'You reached dashboard';

    }
}());