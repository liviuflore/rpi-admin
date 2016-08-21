/**
 * @author a.demeshko
 * created on 24/12/15
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.torrents')
    .controller('addBoxCtrl', addBoxCtrl);

  /** @ngInject */
  function addBoxCtrl(magnet, location, mwAPI, toastr) {
    var vm = this;
    vm.magnet = magnet;
    vm.downloadLocation = location;
    vm.autoStart = true;
    vm.delFile = false;

    vm.downloadLocations = [
      '~/downloads/completed',
    ];

    // TODO: load searchDownloadLocations from MW
    vm.UpdateDownloadLocations = function () {
      mwAPI.getReq('/api/torrents/cacheDownloadDir').then(function (data) {
        if (typeof data == 'undefined') {
          console.log("Could not get settings!");
          toastr.error("Could not get settings!", 'Error');
        } else {
          data.forEach(function (item) {
            if (item && !(typeof item !== 'object' && item !== null)) {
              if (item.ddir && (item.ddir !== null)) {
                console.log('add   location: ' + item.ddir);
                vm.downloadLocations.push(item.ddir);
              }
            }
          });
        }
      });
    };
    vm.UpdateDownloadLocations();

    vm.AddTorrent = function () {
      var torrent = {
        magnet: vm.magnet,
        ddir: vm.downloadLocation,
        autoStart: vm.autoStart,
        delFile: vm.delFile
      };
      mwAPI.postReq('/api/torrents/addTorrent', torrent).then(function (data) {
        if (typeof data == 'undefined' || data.response == 'ERROR') {
          console.log("Could not save location cache");
          toastr.error("Could not save settings!", 'Error');
        }
      });
    };
  }
})();