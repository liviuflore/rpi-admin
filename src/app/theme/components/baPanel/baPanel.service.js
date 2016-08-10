/**
 * @author v.lugovsky
 * created on 23.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.theme')
      .factory('baPanel', baPanel);

  /** @ngInject */
  function baPanel() {

    /** Base baPanel directive */
    return {
      restrict: 'A',
      transclude: true,
      template: function(elem, attrs) {
        var res = '<div class="panel-body" ng-transclude></div>';
        if (attrs.baPanelTitle) {
            if (attrs.baPanelRefresh) {
                //var titleTpl = '<div class="panel-heading clearfix"><div style="width:80%"><h3 class="panel-title">' + attrs.baPanelTitle + '</h3></div><div style="width:20%"><button type="button" class="btn  btn-icon refresh-button"><i class="ion-refresh"></i></button></div></div>';
                var titleTpl = '<div class="panel-heading clearfix"><table style="width:100%"><tbody><tr>' +
                                   '<td style="width:80%"><h3 class="panel-title">' + attrs.baPanelTitle + '</h3></td>' +
                    '<td style="text-align:right"><button type="button" class="btn btn-icon refresh-button" style="width: 24px; height: 24px; line-height: 24px"><i class="ion-refresh ' + attrs.baPanelRefresh + '"></i></button></td>' +
                               '</tr></tbody></table></div>';
                res = titleTpl + res; // title should be before
            }
            else {
                var titleTpl = '<div class="panel-heading clearfix"><h3 class="panel-title">' + attrs.baPanelTitle + '</h3></div>';
                res = titleTpl + res; // title should be before
            }
        }

        return res;
      }
    };
  }

})();
