/**
 * @author l.flore
 * created on 11.08.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.torrents', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('torrents', {
          url: '/torrents',
          abstract: true,
          templateUrl: 'app/pages/torrents/torrents.html',
          controller: "TorrentsTabCtrl",
          controllerAs: "tabCtrl",
          title: 'Torrents',
          sidebarMeta: {
            icon: 'ion-archive',
            order: 0,
          }
        }).state('torrents.label', {
          url: '/:label',
          templateUrl: 'app/pages/torrents/list/torrentsList.html',
          title: 'Torrents',
          controller: "TorrentsListCtrl",
          controllerAs: "listCtrl",
        }).state('torrents.detail', {
          url: '/:label/:id',
          templateUrl: 'app/pages/torrents/detail/torrentsDetail.html',
          title: 'Torrents',
          controller: "TorrentsDetailCtrl",
          controllerAs: "detailCtrl"
        });
    $urlRouterProvider.when('/torrents','/torrents/all');
  }

})();
