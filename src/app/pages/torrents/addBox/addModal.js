/**
 * @author a.demeshko
 * created on 12/24/15
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.torrents')
    .service('addModal', addModal);

  /** @ngInject */
  function addModal($uibModal) {
      this.open = function(options){
        return $uibModal.open({
          animation: false,
          templateUrl: 'app/pages/torrents/addBox/add.html',
          controller: 'addBoxCtrl',
          controllerAs: 'boxCtrl',
          size: 'add',
          resolve: {
            magnet: function () {
              return options.magnet;
            },
            to: function () {
              return options.to;
            },
            text: function () {
              return options.text;
            }
          }
        });
      }

  }

})();