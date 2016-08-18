/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.torrents')
    .controller('TorrentsDetailCtrl', TorrentsDetailCtrl);

  /** @ngInject */
  function TorrentsDetailCtrl($stateParams, $scope, torrentsList, toastr) {
    var vm = this;

    /* todo: load only one torrent */
    $scope.LoadTorrent = function () {
        torrentsList.getTorrents().then(function (torrents) {
            if (typeof torrents != 'undefined') {
                vm.torrent = torrentsList.filterById(torrents, $stateParams.id);
            }
            else {
                console.log("Could not get specified torrent. Check connection settings!");
                toastr.error("Could not get specified torrent. Check connection settings!", 'Error');
            }
        });
    };
    vm.label = $stateParams.label;
    $scope.LoadTorrent();
  }

})();
