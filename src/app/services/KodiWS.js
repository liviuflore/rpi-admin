(function () {

  'use strict';

  angular.module('BlurAdmin.services')
    .service('KodiWS', KodiWSService);

  /** @ngInject */
  function KodiWSService($q, $window, KODI_CONFIG, log, toastr) {
    //var kodi_ws_url = 'ws://' + KODI_CONFIG.HOST + ':' + KODI_CONFIG.PORT + '/jsonrpc';
    //var kodi_ws_url = 'ws://' + window.location.host + '/api';
    var kodi_ws_url = 'ws://localhost:5001';
    log.d('init KodiWSService [connecting to: ' + kodi_ws_url + ']');
    //toastr.info('init KodiWSService [connecting to: ' + kodi_ws_url + ']', 'Info');

    var ws = new WebSocket(kodi_ws_url);

    ws.onopen = function () {
      log.d('Connected to Kodi Web Socket');
      //toastr.info('Connected to Kodi Web Socket', 'Info');
    };
    
    ws.onerror = function () {
      log.d('Socket error');
      toastr.info('Socket error', 'Info');
    };
    
    ws.onclose = function (event) {
      log.d('Closing socket [' + event.code + ']');
      //toastr.info('Closing socket [' + event.code + ']', 'Info');
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
            //toastr.info('Wait for connection...', 'Info');
            waitForConnection(callback, attempt - 1);
          } else {
            log.e('Could not connect to Kodi!');
            toastr.error('Could not connect to Kodi!', 'Error');
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