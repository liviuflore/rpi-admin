(function () {

  'use strict';

  angular.module('BlurAdmin.services')
    .service('log', loggingService);

  /** @ngInject */
  function loggingService(DEBUG) {
    
    if (DEBUG) {
      var debugLog = console.log.bind(window.console, 'DBG: ');
      var errorLog = console.log.bind(window.console, 'ERR: ');
    }
    else {
      var debugLog = function () { };
      var errorLog = function () { };
    }

    return {
      d: debugLog,
      e: errorLog
    }
  };

})();