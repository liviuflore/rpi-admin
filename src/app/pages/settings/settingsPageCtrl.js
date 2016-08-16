/**
 * @author f.flore
 * created on 16.08.2016
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.settings')
    .controller('SettingsPageCtrl', SettingsPageCtrl);

  /** @ngInject */
  function SettingsPageCtrl($scope, fileReader, $filter, $uibModal, $q, $http) {
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
    $scope.sysSettings = {
      webPort: 80,
      statsUpdateInterval: 3000,
    };
    $scope.torrentsSettings = {
      host : '127.0.0.1',
      port: '9091',
      username: 'transmission',
      password: 'transmission',
      url: '/transmission/rpc',
      downloadDir: '~/downloads/complete',
      startWhenAdded: true,
      upLimit: 1000,
      upLimitEn: false,
      downLimit: 1000,
      downLimitEn: false,
    }

    function runRequest(req) {
      var deferredQ = $q.defer();
      $http.get(req).then(function (response) {
        deferredQ.resolve(response.data);
      }, function (error) {
        console.error(error);
        deferredQ.reject(Error("Failed to get '" + req + "'! [" + error + "]"));
      });
      return deferredQ.promise;
    };

    $scope.LoadSettings = function () {
      runRequest('/api/config/system').then(function (data) {
        if (typeof data != 'undefined') {
          $scope.sysSettings = data;
        }
        else {
          console.log("Could not get settings!");
          toastr.error("Could not get settings!", 'Error');
        }
      });
      runRequest('/api/config/transmission').then(function (data) {
        if (typeof data != 'undefined') {
          $scope.torrentsSettings = data;
        }
        else {
          console.log("Could not get settings!");
          toastr.error("Could not get settings!", 'Error');
        }
      });
    };
    $scope.LoadSettings();


    /* TBR */
    $scope.switches = [true, true, false, true, true, false];
  }

})();
