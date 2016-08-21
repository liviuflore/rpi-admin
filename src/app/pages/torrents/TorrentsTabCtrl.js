/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.torrents')
      .controller('TorrentsTabCtrl', TorrentsTabCtrl);

  /** @ngInject */
  function TorrentsTabCtrl(addModal, torrentsList) {

    var vm = this;
    vm.navigationCollapsed = true;
    vm.showAdd = function(magnet, location){
      addModal.open({
        magnet : magnet,
        location: location
      })
    };

    vm.tabs = torrentsList.getTabs();
  }

})();
