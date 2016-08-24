(function () {

  'use strict';

  angular.module('BlurAdmin.services')
    .service('KodiWS', KodiWSService);

  /** @ngInject */
  function KodiWSService($q, $window, KODI_CONFIG, log) {
    log.d('init KodiWSService');

    var ws = new WebSocket('ws://' + KODI_CONFIG.HOST + ':' + KODI_CONFIG.PORT + '/jsonrpc');

    ws.onopen = function () {
      log.d('Connected to Kodi Web Socket');
    };
    
    ws.onerror = function () {
      log.d('Socket error');
    };
    
    ws.onclose = function () {
      log.d('Closing socket');
    };
    
    /**
     * Attempt to connect to the Web Socket (try several times if needed by recursion).
     *
     * @param The callback to call if connection succeed.
     * @param integer attempt : the attempt number (decreasing until 0).
     * @return void
     */
    function waitForConnection(callback, attempt) {
      setTimeout(function () {
        if (ws.readyState !== WebSocket.OPEN) {
          if (attempt > 0) {
            log.d('Wait for connection...');
            waitForConnection(callback, attempt - 1);
          } else {
            log.d('Error : Could not connect to Kodi!');
            $window.location.href = '#error';
          }
        } else {
          callback();
        }
      }, KODI_CONFIG.TIMEOUT);
    }
    
    /**
     * Communicate through the Web Socket.
     *
     * @param string method : the method sent through the socket.
     * @param array params : parameters sent.
     * @return callback with the response.
     */
    function sendMessage(method, params) {
      var deferred = $q.defer();
      waitForConnection(function () {
        var id = Math.floor((Math.random() * 100) + 1);
        ws.send(JSON.stringify({ jsonrpc: '2.0', id: id, method: method, params: params }));
        ws.onmessage = function (message) {
          var response = JSON.parse(message.data);
          
          if (response.id === id) {
            if (response.error !== undefined) {
              var error = response.error;
              log.d(method + ' : ' + error.message);
            }
            
            deferred.resolve(response.result);
          }
        };
      }, 10);
      return deferred.promise;
    }
    
    var service = {
      send: sendMessage,
    };
    return service;
  };

})();