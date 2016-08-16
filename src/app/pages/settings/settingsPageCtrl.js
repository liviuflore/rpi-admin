/**
 * @author f.flore
 * created on 16.08.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.settings')
    .controller('SettingsPageCtrl', SettingsPageCtrl);

  /** @ngInject */
  function SettingsPageCtrl($scope, fileReader, $filter, $uibModal) {
    $scope.picture = $filter('profilePicture')('face');

    $scope.removePicture = function () {
      $scope.picture = $filter('appImage')('theme/no-photo.png');
      $scope.noPicture = true;
    };

    $scope.uploadPicture = function () {
      var fileInput = document.getElementById('uploadFile');
      fileInput.click();

    };

    $scope.unconnect = function (item) {
      item.href = undefined;
    };

    $scope.getFile = function () {
      fileReader.readAsDataUrl($scope.file, $scope)
          .then(function (result) {
            $scope.picture = result;
          });
    };

    $scope.switches = [true, true, false, true, true, false];
  }

})();
