/**
 * @author a.demeshko
 * created on 28.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.torrents')
      .filter('statusText', function (){ return statusText; });
  function statusText(code) {
    switch (code) {
        case 0:
            return "stopped";
        case 1:
            return "check_wait";
        case 2:
            return "check";
        case 3:
            return "download_wait";
        case 4:
            return "download";
        case 5:
            return "seed_wait";
        case 6:
            return "seed";
        case 7:
            return "isolated";
        default:
            return "unknown";
    }
  };
  
  angular.module('BlurAdmin.pages.torrents')
      .filter('statusOrEta', function () { return statusOrEta; });
  function statusOrEta(torrent) {
      if (torrent.status == 3 || torrent.status == 4)
          return torrent.eta;
      else
          return statusText(torrent.status);
  };

  angular.module('BlurAdmin.pages.torrents')
      .filter('statusIcon', function () { return statusIcon; });
  function statusIcon(status) {
      if (status == 3 || status == 4 || status == 5 || status == 6)
          return 'clock';
      else if (status == 0)
          return 'pause';
      else if (status == 1 || status == 2)
          return 'load-a';
      else
          return '';
  };

  angular.module('BlurAdmin.pages.torrents')
      .filter('rateIcon', function () { return rateIcon; });
  function rateIcon(status) {
      if (status == 5 || status == 6)
          return 'arrow-up-a';
      else
          return 'arrow-down-a';
  };

  angular.module('BlurAdmin.pages.torrents')
      .filter('rateSpeed', function () { return rateSpeed; });
  function rateSpeed(torrent) {
      if (torrent.status == 5 || torrent.status == 6)
          return torrent.rateUpload;
      else
          return torrent.rateDownload;
  };

  angular.module('BlurAdmin.pages.torrents')
    .controller('TorrentsListCtrl', TorrentsListCtrl);

  /** @ngInject */
  function TorrentsListCtrl($scope, $stateParams, torrentsList) {
    var vm = this;
    vm.torrents = [];
    vm.label = $stateParams.label;

    $scope.selectedTorrents = [];
    $scope.selectAll = false;
    $scope.LoadTorrents = function () {
        torrentsList.getTorrents().then(function (torrents) {
            vm.torrents = torrentsList.filterByLabel(torrents, $stateParams.label);
            angular.forEach(vm.torrents, function (torrent) {
                $scope.selectedTorrents.push({ id: torrent.id, selected: false });
            });
        });
    };
    $scope.LoadTorrents();

    $scope.ToggleSelectAll = function () {
        angular.forEach($scope.selectedTorrents, function (selTorrent) {
            selTorrent.selected = $scope.selectAll;
        });
    };

    $scope.GetSelectedIds = function () {
        var selectedIds = [];
        angular.forEach($scope.selectedTorrents, function (selTorrent) {
            if (selTorrent.selected == true) {
                selectedIds.push(selTorrent.id);
            }
        });
        return selectedIds;
    }
    $scope.DeleteTorrents = function () {
        var selectedIds = $scope.GetSelectedIds();
        torrentsList.deleteTorrents(selectedIds, false).then(function(result) {
            $scope.LoadTorrents();
        });
    };
    $scope.StopTorrents = function () {
        var selectedIds = $scope.GetSelectedIds();
        torrentsList.stopTorrents(selectedIds).then(function (result) {
            $scope.LoadTorrents();
        });
    };
    $scope.StartTorrents = function () {
        var selectedIds = $scope.GetSelectedIds();
        torrentsList.startTorrents(selectedIds).then(function (result) {
            $scope.LoadTorrents();
        });
    };

  }

})();
