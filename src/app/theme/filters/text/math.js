/**
 * @author a.demeshko
 * created on 23.12.2015
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.theme')
        .filter('mathRound', mathRound);
    /** @ngInject */
    function mathRound() {
        return function (number, decimals) {
            var round = Math.pow(10, decimals);
            return number ? Math.round(number * round) / round : '';
        };
    }

    angular.module('BlurAdmin.theme')
        .filter('autoSizeBytes', function () { return autoSizeBytes; });
    function autoSizeBytes(bytes) {
        if (bytes >= 1024 * 1024 * 1024 * 1024)
            return Math.round(bytes * 1000 / (1024 * 1024 * 1024 * 1024)) / 1000 + ' TB'
        else if (bytes >= 1024 * 1024 * 1024)
            return Math.round(bytes * 100 / (1024 * 1024 * 1024)) / 100 + ' GB'
        else if (bytes >= 1024 * 1024)
            return Math.round(bytes*10 / (1024 * 1024)) / 10 + ' MB'
        else if (bytes >= 1024)
            return Math.round(bytes / 1024) + ' KB'
        return bytes + ' B'
    };

    angular.module('BlurAdmin.theme')
        .filter('autoSpeedB', function () { return autoSpeedB; });
    function autoSpeedB(Byteps) {
        var bps = Byteps * 8;
        if (bps >= 1000000000)
            return Math.round(bps / 10000000) / 100 + ' Gbps'
        else if (bps >= 1000000)
            return Math.round(bps / 100000) / 10 + ' Mbps'
        else if (bps >= 1000)
            return Math.round(bps / 1000) + ' kbps'
        return bps + ' bps'
    };

    angular.module('BlurAdmin.theme')
        .filter('autoTime', function () { return autoTime; });
    function autoTime(time) {
        if (time === parseInt(time, 10)) {
            if (time < 0)
                return 'unknown';
            else {
                var days = Math.round(time / 86400);
                var hours = Math.round(time / 3600);
                var rem_hours = hours - (days * 24);
                var minutes = Math.round(time / 60);
                var rem_minutes = minutes - (hours * 60);
                var seconds = time;
                var rem_seconds = seconds - (minutes * 60);
                var retstr = '';
                if (days > 2)
                    return days + ' days';
                if (days > 0)
                    return (days + ((days == 1) ? ' day' : ' days') + ((rem_hours > 0) ? ', ' + rem_hours + ((rem_hours == 1) ? ' hour' : ' hours') : ''));
                if (hours > 0)
                    return (hours + ((hours == 1) ? ' hour' : ' hours') + ((rem_minutes > 0) ? ', ' + rem_minutes + ((rem_minutes == 1) ? ' minute' : ' minutes') : ''));
                if (minutes > 0)
                    return (minutes + ((minutes == 1) ? ' minute' : ' minutes') + ((rem_seconds > 0) ? ', ' + rem_seconds + ((rem_seconds == 1) ? ' second' : ' seconds') : ''));
                return seconds + (seconds == 1) ? ' second' : ' seconds';
            }
        }
        else {
            return time;
        }
    };
    angular.module('BlurAdmin.theme')
        .filter('autoTimeShort', function () { return autoTimeShort; });
    function autoTimeShort(time) {
        if (time === parseInt(time, 10)) {
            if (time < 0)
                return 'unknown';
            else {
                var days = Math.round(time / 86400);
                var hours = Math.round(time / 3600);
                var rem_hours = hours - (days * 24);
                var minutes = Math.round(time / 60);
                var rem_minutes = minutes - (hours * 60);
                var seconds = time;
                var rem_seconds = seconds - (minutes * 60);
                var retstr = '';
                if (days > 0)
                    return (days + 'd') + ((rem_hours > 0) ? (' ' + rem_hours + 'h') : '');
                if (hours > 0)
                    return (hours + 'h') + ((rem_minutes > 0) ? (' ' + rem_minutes + 'm') : '');
                if (minutes > 0)
                    return (minutes + 'm') + ((rem_seconds > 0) ? (' ' + rem_seconds + 's') : '');
                return seconds + 's';
            }
        }
        else {
            return time;
        }
    };

})();
