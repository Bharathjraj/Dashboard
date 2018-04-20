(function () {
    'use strict';

    angular.module('managment.shared.i18n', ['pascalprecht.translate', 'tmh.dynamicLocale']);

    angular.module('managment.shared.i18n')
        .config(['$translateProvider', '$translatePartialLoaderProvider', 'tmhDynamicLocaleProvider',
            function ($translateProvider, $translatePartialLoaderProvider, tmhDynamicLocaleProvider) {

                tmhDynamicLocaleProvider.localeLocationPattern('https://code.angularjs.org/1.2.20/i18n/angular-locale_{{locale}}.js');
                $translateProvider.useLoader('$translatePartialLoader', {
                    urlTemplate: '/translations/{lang}/{part}.json'
                });
                $translateProvider.useSanitizeValueStrategy('escaped');
                $translateProvider.directivePriority(222);
                $translateProvider.preferredLanguage('en-US');
                $translateProvider.fallbackLanguage('en-US');
            }]);
    angular.module('managment.shared.i18n')
        .controller('TranslateController', function ($translate, $scope) {

        });
})();