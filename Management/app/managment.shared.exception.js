/**
 * Exception Handler. A decorator on the top of native Angular exception handler
 */
(function () {
    'use strict';
    angular.module('managment.shared.exception', ['managment.shared.constant'])
        .config(['$compileProvider', '$logProvider','$provide', 'appSettings',
            function ($compileProvider, $logProvider, $provide, appSettings) {

                $compileProvider.debugInfoEnabled(false);
                //$compileProvider.commentDirectivesEnabled(false);
                //$compileProvider.cssClassDirectivesEnabled(false);
                $logProvider.debugEnabled(false);
                
                //Exception handler
                $provide.decorator("$exceptionHandler",
                    function ($delegate, $injector) {
                        return function (exception, cause) {
                            $delegate(exception, cause);
                            if (exception) {
                                var $log = $injector.get('$log');
                                var $translate = $injector.get('$translate');
                                $log.push(exception);
                            }
                        };
                    });
            }])
        .factory('managmentHttpInterceptor', ['$q', '$rootScope', '$injector', '$exceptionHandler', function ($q, $rootScope, $injector, $exceptionHandler) {
            var $http;
            return {
                request: function (config) {
                    $rootScope.showLoadingSpinner = true;
                    return config;
                },
                requestError: function requestError(rejection) {
                    $http = $http || $injector.get('$http');
                    if (rejection && rejection.status) {
                        $exceptionHandler(rejection);
                    }
                    if ($http.pendingRequests.length < 1) {
                        $rootScope.showLoadingSpinner = false;
                    }
                    return $q.reject(rejection);
                },
                response: function (response) {
                    $http = $http || $injector.get('$http');
                    if ($http.pendingRequests.length < 1) {
                        $rootScope.showLoadingSpinner = false;
                    }
                    return response;
                },
                responseError: function responseError(rejection) {
                    $http = $http || $injector.get('$http');
                    var count = $http.pendingRequests.length;
                    if ($http.pendingRequests.length < 1) {
                        $rootScope.showLoadingSpinner = false;
                    }
                    if (rejection && rejection.status) {
                        $exceptionHandler(rejection);
                    }
                    return $q.reject(rejection);
                }
            };
        }])
        .config(['$httpProvider', function ($httpProvider) {
            $httpProvider.interceptors.push('managmentHttpInterceptor');
        }])
        .controller('ErrorHandlerController', function ($scope, $uibModal, $uibModalInstance, exceptionData, $rootScope, $translate) {
            $scope.exceptionData = exceptionData;
            $scope.ok = function () {
                $uibModalInstance.close();
            };
        })
        .controller('ErrorController', function ($scope, $uibModal, $uibModalInstance, errorMessage, $rootScope, $translate) {
            $scope.em = errorMessage;
            $scope.ok = function () {
                $uibModalInstance.close();
            };
        });
})();