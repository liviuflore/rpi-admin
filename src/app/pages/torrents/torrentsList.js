/**
 * @author a.demeshko
 * created on 12/29/15
 */
(function () {
    'use strict';

    angular.module('BlurAdmin.pages.torrents')
        .service('torrentsList', torrentsList);
    /** @ngInject */
    function torrentsList($q, $http) {

        var tabs = [{
            label: 'all',
            name: 'All',
            statusIds: []
        }, {
            label: 'active',
            name: 'Active',
            statusIds: [1, 2, 3, 4, 5, 6]
        }, {
            label: 'finished',
            name: 'Finished',
            statusIds: [5, 6]
        }, {
            label: 'downloading',
            name: 'Downloading',
            statusIds: [3, 4]
        }, {
            label: 'paused',
            name: 'Paused',
            statusIds: [0]
        }, {
            label: 'error',
            name: 'Error',
            statusIds: []
        }];
        function runRequest(req) {
            var deferredQ = $q.defer();
            $http.get(req).then(function (response) {
                deferredQ.resolve(response.data.torrents);
            }, function (error) {
                console.error(error);
                deferredQ.reject(Error("Failed to get '" + req + "'! [" + error + "]"));
            });
            return deferredQ.promise;
        };

        return {
            getTorrents: function () {
                console.log("get torrents");
                return runRequest('/api/transmission/torrents');
            },
            deleteTorrents: function (list, deleteData) {
                deleteData = typeof deleteData !== 'undefined' ? deleteData : false;
                console.log("delete torrents " + list);
                return runRequest('/api/transmission/delete_torrents/' + (list.length == 0 ? 'none' : list) + '/' + deleteData);
            },
            stopTorrents: function (list) {
                console.log("stop torrents " + list);
                return runRequest('/api/transmission/stop_torrents/' + (list.length == 0 ? 'none' : list));
            },
            startTorrents: function (list) {
                console.log("start torrents " + list);
                return runRequest('/api/transmission/start_torrents/' + (list.length == 0 ? 'none' : list));
            },
            getTabs: function () {
                return tabs;
            },
            filterByLabel: function (torrents, label) {
                torrents.sort(function (a, b) {
                    if (a.date > b.date) return 1;
                    if (a.date < b.date) return -1;
                }).reverse();
                return torrents.filter(function (t) {
                    if (label == 'all')
                        return true;
                    else {
                        var tab = $.grep(tabs, function (e) { return e.label == label; })[0];
                        return (tab.statusIds.indexOf(t.status) > -1);
                    }
                });
            },
            filterById: function (torrents, id) {
                torrents.sort(function (a, b) {
                    if (a.date > b.date) return 1;
                    if (a.date < b.date) return -1;
                }).reverse();
                return torrents.filter(function (m) {
                    return m.id == id;
                })[0];
            }
        }

    }

})();