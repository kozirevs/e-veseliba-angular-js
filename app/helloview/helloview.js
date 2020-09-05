'use strict';

angular.module('myApp.helloview', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/helloview', {
            templateUrl: 'helloview/helloview.html',
            controller: 'HelloviewCtrl'
        });
    }])

    .controller('HelloviewCtrl', [function () {

    }]);
