/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.tvshows')
    .controller('TvshowsTabCtrl', TvshowsTabCtrl);

  /** @ngInject */
  function TvshowsTabCtrl($scope, KodiWS, log) {
    log.d('init TvshowsTabCtrl');

    var vm = this;
    vm.recentEpisodes = [];

    $scope.getRecentEpisodes = function () {
      log.d('get recent episodes');
      KodiWS.send('VideoLibrary.getRecentlyAddedEpisodes', { "properties": ["title", "showtitle", "tvshowid"] }).then(function (data) {
        //deferred.resolve(data);
        for (var i = 0; i < data.episodes.length; i++) {
          vm.recentEpisodes.push(data.episodes[i]);
        }
      });

    };
    $scope.getRecentEpisodes();
  }

})();
