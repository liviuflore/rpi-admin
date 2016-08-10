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
    $scope.charts = [{
        color: pieColor,
        description: 'Temp',
        stats: '',
    }, {
        color: pieColor,
        description: 'CPU freq',
        stats: '',
    }, {
        color: pieColor,
        description: 'CPU Load',
        stats: '',
    }, {
        color: pieColor,
        description: 'RAM',
        stats: '',
    }
    ];

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

    function getPercent(value, max) {
        return (value / max) * 100;
    }
    function updatePieCharts() {
        $http.get("/api/cpustats").success(function (data) {
            $('.pie-charts .chart').each(function (index, chart) {
                var value = 0;
                var statval = "xxx";
                if (index == 0) { value = getPercent(data.cpuTemp, 90); statval = data.cpuTemp + ' &deg;C'; };
                if (index == 1) { value = getPercent(data.cpuFreq, data.cpuFreqMax); statval = data.cpuFreq + ' MHz'; };
                if (index == 2) { value = data.cpuLoad; statval = data.cpuLoad + ' %'; };
                if (index == 3) { value = getPercent(data.ramUsed, data.ramTotal); statval = data.ramUsed + ' MB'; };
                $(chart).data('easyPieChart').update(value);
                $('.description-stats')[index].innerHTML = statval;
            });
        }).error(function () {
            //alert("unexpected error!");
        });
    }

    $timeout(function () {
      loadPieCharts();
      updatePieCharts();
    }, 1000);
  }
})();