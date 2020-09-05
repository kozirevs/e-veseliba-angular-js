'use strict';

angular.module('myApp.homedoctor', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/homedoctor', {
            templateUrl: 'homedoctor/homedoctor.html',
            controller: 'HomedoctorCtrl'
        });
    }])

    .controller('HomedoctorCtrl', ['$scope', '$http',
        function ($scope, $httpClient) {

            $scope.homeDoctorArray = [];

            $scope.searchClick = function () {
                var homeDoctorDTO = {
                    name: $scope.nameSearch,
                    external_ref: $scope.extRefSearch,
                    phone: $scope.phoneSearch
                }

                var submitData = JSON.stringify(homeDoctorDTO, function (key, value) {
                    if (value === "") {
                        return null;
                    }
                    return value;
                });

                $httpClient.post("http://127.0.0.1:8080/api/rest/HomeDoctor.svc/HomeDoctors/search", submitData)
                    .then(function (response) {
                        console.log(response);
                        if (response.data != null && response.data.result === "SUCCESS") {
                            $scope.homeDoctorArray = response.data.holderList;
                        }
                    })
            }

            $httpClient.get("http://127.0.0.1:8080/api/rest/HomeDoctor.svc/HomeDoctors")
                .then(function (response) {
                    if (response.data != null && response.data.result === "SUCCESS") {
                        $scope.homeDoctorArray = response.data.holderList;
                    }
                })
        }]);
