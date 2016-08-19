/**
 * @author a.demeshko
 * created on 24/12/15
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.torrents')
    .controller('addBoxCtrl', addBoxCtrl);

  /** @ngInject */
  function addBoxCtrl(magnet, to, text, mwAPI, toastr) {
    var vm = this;
    vm.magnet = magnet;
    vm.to = to;
    vm.text = text;

    vm.searchDownloadLocations = [
      { label: '~/downloads/completed', value: 1 },
    ];

    // TODO: load searchDownloadLocations from MW
    vm.UpdateDownloadLocations = function () {
      mwAPI.getReq('/api/config/get').then(function (data) {
        if (typeof data == 'undefined') {
          console.log("Could not get settings!");
          toastr.error("Could not get settings!", 'Error');
        } else {
          //vm.config = data;
        }
      });
    };
    vm.UpdateDownloadLocations();
  }
})();