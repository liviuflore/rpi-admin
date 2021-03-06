(function () {

    'use strict';

    var config_module = angular.module('BlurAdmin.config', [])

    var config_data = {
        'DEBUG': 1,
        'GENERAL_CONFIG': {
            'APP_NAME': 'Rpi Admin',
            'APP_VERSION': '0.1',
            'API_VERSION': '0.1'
        },
        'WEATHER_CONFIG': {
            'APIKEY': '5dd5db267b647d988b1293d998231b35',
            'UNITS': 'metric',
            'MIDDLEOFDAY': 15
        },
        'KODI_CONFIG': {
            'HOST': '192.168.1.21',
            'PORT': 9090,
            'TIMEOUT': 200
        }
    }

    angular.forEach(config_data, function (key, value) {
        config_module.constant(value, key);
    });

})();