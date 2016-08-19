(function () {

    'use strict';

    var config_module = angular.module('BlurAdmin.config', [])

    var config_data = {
        'GENERAL_CONFIG': {
            'APP_NAME': 'Rpi Admin',
            'APP_VERSION': '0.1',
            'API_VERSION': '0.1'
        },
        'WEATHER_CONFIG': {
            'APIKEY': '5dd5db267b647d988b1293d998231b35',
            'UNITS': 'metric',
            'MIDDLEOFDAY': 15
        }
    }

    angular.forEach(config_data, function (key, value) {
        console.log('add constant ' + key);
        config_module.constant(value, key);
    });

})();