/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.torrents')
    .controller('TorrentsDetailCtrl', TorrentsDetailCtrl);

  /** @ngInject */
  function TorrentsDetailCtrl($stateParams, $scope, torrentsList) {
    var vm = this;

    /* todo: load only one torrent */
    $scope.LoadTorrent = function () {
        torrentsList.getTorrents().then(function (torrents) {
            vm.torrent = torrentsList.filterById(torrents, $stateParams.id);
        });
    };
    vm.label = $stateParams.label;
    $scope.LoadTorrent();

  }

})();
