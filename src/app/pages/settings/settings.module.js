/**
 * @author f.flore
 * created on 16.08.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.settings', [])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('settings', {
          url: '/settings',
          title: 'Settings',
          templateUrl: 'app/pages/settings/settings.html',
          controller: 'SettingsPageCtrl',
        });
  }

})();
