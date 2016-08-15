/**
 * @author a.demeshko
 * created on 24/12/15
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.torrents')
    .controller('addBoxCtrl', addBoxCtrl);

  /** @ngInject */
  function addBoxCtrl(magnet, to, text) {
    var vm = this;
    vm.magnet = magnet;
    vm.to = to;
    vm.text = text;
  }
})();