/**
 * @author f.flore
 * created on 16.08.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.settings')
    .controller('SettingsPageCtrl', SettingsPageCtrl);

  /** @ngInject */
  function SettingsPageCtrl($scope, fileReader, $filter, $uibModal, $q, $http, toastr) {
    /* TBR */
    $scope.picture = $filter('profilePicture')('face');
    /* TBR */
    $scope.removePicture = function () {
      $scope.picture = $filter('appImage')('theme/no-photo.png');
      $scope.noPicture = true;
    };
    /* TBR */
    $scope.uploadPicture = function () {
      var fileInput = document.getElementById('uploadFile');
      fileInput.click();

    };
    /* TBR */
    $scope.unconnect = function (item) {
      item.href = undefined;
    };
    /* TBR */
    $scope.getFile = function () {
      fileReader.readAsDataUrl($scope.file, $scope)
          .then(function (result) {
            $scope.picture = result;
          });
    };

    /*default settings */
    $scope.config = {
    };

    function runGetRequest(req) {
      var deferredQ = $q.defer();
      $http.get(req).then(function (response) {
        deferredQ.resolve(response.data);
      }, function (error) {
        console.error(error);
        deferredQ.reject(Error("Failed to get '" + req + "'! [" + error + "]"));
      });
      return deferredQ.promise;
    };
    function runPostRequest(req, data) {
      var deferredQ = $q.defer();
      $http.post(req, data).then(function (response) {
        deferredQ.resolve(response.data);
      }, function (error) {
        console.error(error);
        deferredQ.reject(Error("Failed to get '" + req + "'! [" + error + "]"));
      });
      return deferredQ.promise;
    };

    $scope.LoadConfig = function () {
      runGetRequest('/api/config/get').then(function (data) {
        if (typeof data == 'undefined') {
          console.log("Could not get settings!");
          toastr.error("Could not get settings!", 'Error');
        } else {
          $scope.config = data;
        }
      });
    };
    $scope.LoadConfig();

    $scope.SaveConfig = function () {
      runPostRequest('/api/config/save', $scope.config).then(function (data) {
        if (typeof data == 'undefined' || data.response == 'ERROR') {
          console.log("Could not save settings!");
          toastr.error("Could not save settings!", 'Error');
        } else {
          $scope.LoadConfig();
          toastr.info("settings saved!", 'Info');
        }
      });
    };


    /* TBR */
    $scope.switches = [true, true, false, true, true, false];
  }

})();
