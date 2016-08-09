/**
 * @author v.lugovksy
 * created on 16.12.2015
 */

(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .controller('dashboardPiStatsPieCtrl', dashboardPiStatsPieCtrl);

  /** @ngInject */
  function dashboardPiStatsPieCtrl($scope, $http, $timeout, baConfig, baUtil) {
      var pieColor = baUtil.hexToRGB(baConfig.colors.defaultText, 0.2);
      var stats = function () {
          $http.get("/api/cpustats").success(function (data) {
              return data;
          }).error(function () {
              //alert("unexpected error!");
          });
      }
      $scope.stats = stats();
    $scope.charts = [{
      color: pieColor,
      description: 'Temp',
      stats: '57,820',
      icon: 'person',
    }, {
      color: pieColor,
      description: 'CPU freq',
      stats: 'xxx',
      icon: 'money',
    }, {
      color: pieColor,
      description: 'CPU Load',
      stats: '178,391',
      icon: 'face',
    }, {
      color: pieColor,
      description: 'RAM',
      stats: '32,592',
      icon: 'refresh',
    }
    ];

    function getRandomArbitrary(min, max) {
      return Math.random() * (max - min) + min;
    }

    function loadPieCharts() {
      $('.chart').each(function () {
        var chart = $(this);
        chart.easyPieChart({
          easing: 'easeOutBounce',
          onStep: function (from, to, percent) {
            $(this.el).find('.percent').text(Math.round(percent));
          },
          barColor: chart.attr('rel'),
          trackColor: 'rgba(0,0,0,0)',
          size: 84,
          scaleLength: 0,
          animation: 2000,
          lineWidth: 9,
          lineCap: 'round',
        });
      });

      $('.refresh-data').on('click', function () {
        updatePieCharts();
      });
    }

    function updatePieCharts() {
      $('.pie-charts .chart').each(function(index, chart) {
        $(chart).data('easyPieChart').update(getRandomArbitrary(55, 90));
      });
    }

    $timeout(function () {
      loadPieCharts();
      updatePieCharts();
    }, 1000);
  }
})();