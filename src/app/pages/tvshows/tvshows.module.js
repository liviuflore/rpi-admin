/**
 * @author l.flore
 * created on 11.08.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.tvshows', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('tvshows', {
          url: '/tvshows',
//          abstract: true,
          templateUrl: 'app/pages/tvshows/tvshows.html',
          controller: "TvshowsTabCtrl",
          controllerAs: "tabCtrl",
          title: 'TvShows',
          sidebarMeta: {
            icon: 'ion-ios-film',
            order: 0,
          }
        }).state('tvshows.detail', {
          url: '/:id',
          templateUrl: 'app/pages/tvshows/detail/tvshowsDetail.html',
          title: 'TvShows',
          controller: "TvshowsDetailCtrl",
          controllerAs: "detailCtrl"
        });
  }

})();
