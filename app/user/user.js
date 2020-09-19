'use strict';

angular.module('myApp.user', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/user', {
            templateUrl: 'user/user.html',
            controller: 'UserCtrl'
        });
    }])

    .controller('UserCtrl', ['$scope', '$http', '$routeParams',
        function ($scope, $httpClient, $routeParams) {

            $scope.action = "";
            var action = $routeParams.action;
            var id = $routeParams.id;

            if(action === 'edit') {
                $scope.action = "Edit";
            } else {
                $scope.action = "Register";
            }

            $scope.homeDoctorArray = [];

            $httpClient.get("http://127.0.0.1:8080/api/rest/HomeDoctor.svc/HomeDoctors")
                .then(function (response) {
                    if (response.data != null && response.data.result === "SUCCESS") {
                        $scope.homeDoctorArray = response.data.holderList;
                    }
                })

            $scope.createUser = function () {

                var userDTO = {
                    name: $scope.userName,
                    address: $scope.userAddress,
                    phone: $scope.userPhone,
                    email: $scope.userEmail,
                    password_hash: $scope.userPassword,
                    user_type: 'PATIENT',
                    home_doctor_id: $scope.selectedHomeDoctorId,
                }

                var submitData = JSON.stringify(userDTO);

                $httpClient.post("http://127.0.0.1:8080/api/rest/User.svc/user", submitData)
                    .then(function (response) {
                        console.log(response);
                        if (response.data != null && response.data.result === "SUCCESS") {
                            window.location.href = "#!/userlist";
                        } else {
                            if (response.data.errorType === "ERROR") {
                                document.getElementById("userRegistrationWarning").style.display = 'none';

                                document.getElementById("userRegistrationError").style.display = 'block';
                                document.getElementById("registrationErrorMessage").textContent = response
                                    .data.message;
                            } else if (response.data.errorType === "WARNING") {
                                document.getElementById("userRegistrationError").style.display = 'none';

                                document.getElementById("userRegistrationWarning").style.display = 'block';
                                document.getElementById("registrationWarningMessage").textContent = response
                                    .data.message;
                            }
                        }
                    })

            }

        }
    ]);
