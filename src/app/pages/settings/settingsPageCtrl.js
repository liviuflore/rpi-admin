/**
 * @author f.flore
 * created on 16.08.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.settings')
    .controller('SettingsPageCtrl', SettingsPageCtrl);

  /** @ngInject */
  function SettingsPageCtrl($scope, fileReader, $filter, $uibModal, mwAPI, toastr) {
    var vm = this;

    /*default settings */
    vm.config = {
    };

    vm.LoadConfig = function () {
      mwAPI.getReq('/api/config/get').then(function (data) {
        if (typeof data == 'undefined') {
          console.log("Could not get settings!");
          toastr.error("Could not get settings!", 'Error');
        } else {
          vm.config = data;
        }
      });
    };
    vm.LoadConfig();

    vm.SaveConfig = function () {
      mwAPI.postReq('/api/config/save', vm.config).then(function (data) {
        if (typeof data == 'undefined' || data.response == 'ERROR') {
          console.log("Could not save settings!");
          toastr.error("Could not save settings!", 'Error');
        } else {
          vm.LoadConfig();
          toastr.info("settings saved!", 'Info');
        }
      });
    };

  }

})();
