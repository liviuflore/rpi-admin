/**
 * @author v.lugovksy
 * created on 16.12.2015
 */

//var os = require('os');

(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard')
      .directive('dashboardPiStatsPie', dashboardPieChart);

  /** @ngInject */
  function dashboardPieChart() {
    return {
      restrict: 'E',
      controller: 'dashboardPiStatsPieCtrl',
      templateUrl: 'app/pages/dashboard/dashboardPiStatsPie/dashboardPiStatsPie.html',
      data: 'xxx'
    };
  }
})();