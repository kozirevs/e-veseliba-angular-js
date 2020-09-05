'use strict';

angular.module('myApp.userlist', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/userlist', {
            templateUrl: 'userlist/userlist.html',
            controller: 'UserlistCtrl'
        });
    }])


    .controller('UserlistCtrl', ['$scope', '$http',
        function ($scope, $httpClient) {

            $scope.userArray = [];

            $scope.homeDoctorArray = [];

            $httpClient.get("http://127.0.0.1:8080/api/rest/HomeDoctor.svc/HomeDoctors")
                .then(function (response) {
                    if (response.data != null && response.data.result === "SUCCESS") {
                        $scope.homeDoctorArray = response.data.holderList;
                    } else {
                        //
                    }
                })

            $scope.getHomeDoctorNameById = function (array, idToFind) {
                if(array != null) {
                    for(var i=0; i < array.length; i++) {
                        if(array[i].id === idToFind) {
                            return array[i].name;
                        }
                    }
                }
            }

            $scope.deleteClick = function (userPk) {
                console.log(userPk);
                $httpClient.delete("http://127.0.0.1:8080/api/rest/User.svc/user/("+ userPk +")")
                    .then(function (response) {
                        if (response.data != null && response.data.result === "SUCCESS") {
                            for(var i=0; i < $scope.userArray.length; i++) {
                                if ($scope.userArray[i].user_pk === userPk) {
                                    $scope.userArray.splice(i, 1);
                                }
                            }
                            //MESSAGE
                        } else {
                            //WARNING
                        }
                    })
            }

            $httpClient.get("http://127.0.0.1:8080/api/rest/User.svc/users")
                .then(function (response) {
                    if (response.data != null && response.data.result === "SUCCESS") {
                        $scope.userArray = response.data.holderList;
                    }
                })

            // $scope.searchClick = function () {
            //     var homeDoctorDTO = {
            //         name: $scope.nameSearch,
            //         external_ref: $scope.extRefSearch,
            //         phone: $scope.phoneSearch
            //     }
            //
            //     var submitData = JSON.stringify(homeDoctorDTO, function (key, value) {
            //         if (value === "") {
            //             return null;
            //         }
            //         return value;
            //     });
            //
            //     $httpClient.post("http://127.0.0.1:8080/api/rest/HomeDoctor.svc/HomeDoctors/search", submitData)
            //         .then(function (response) {
            //             console.log(response);
            //             if (response.data != null && response.data.result === "SUCCESS") {
            //                 $scope.homeDoctorArray = response.data.holderList;
            //             }
            //         })
            // }

        }]);
