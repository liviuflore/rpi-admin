(function () {

  'use strict';

  angular.module('BlurAdmin.services')
    .service('mwAPI', apiService);

  /** @ngInject */
  function apiService($q, $http, log) {
    log.d('init apiService');

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

    return {
      getReq: function (req) {
        return runGetRequest(req);
      },
      postReq: function (req, data) {
        return runPostRequest(req, data);
      },
    }
  };

})();