/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.tvshows')
    .filter('artUrl', function () { return artUrl; });
  function artUrl(art) {
    if ((typeof art == 'string') && art.startsWith("image://http%3a%2f%2")) {
      var enURI = art.substring(8, art.length - 1);
      return decodeURI(decodeURIComponent(enURI.replace(/\+/g, " ")));
    }
    else
      return art;
  };


  angular.module('BlurAdmin.pages.tvshows')
    .controller('TvshowsTabCtrl', TvshowsTabCtrl);

  /** @ngInject */
  function TvshowsTabCtrl($scope, KodiWS, log, toastr) {
    log.d('init TvshowsTabCtrl');

    var vm = this;
    vm.recentEpisodes = [];

    $scope.getRecentEpisodes = function () {
      log.d('get recent episodes');
      KodiWS.send('VideoLibrary.getRecentlyAddedEpisodes', {
        "limits": { "start": 0, "end": 20 },
        "properties": ["title", "season", "episode", "showtitle", "tvshowid", "fanart", "thumbnail", "art", "dateadded"]
      }).then(function (data) {
        //log.d(data.episodes);
        for (var i = 0; i < data.episodes.length; i++) {
          vm.recentEpisodes.push(data.episodes[i]);
        }
      });
    };
    $scope.getRecentEpisodes();

    $('.refresh-data').on('click', function () {
      toastr.info('Refreshing recent episodes', 'Info');
      $scope.getRecentEpisodes();
    });
  }

})();
