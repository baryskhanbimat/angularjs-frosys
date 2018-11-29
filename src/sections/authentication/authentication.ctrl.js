'use strict';
angular
    .module('app.core')
    .controller('AuthenticationController', function($scope, $http, $location, $timeout) {
      var vm = this;
      $scope.getRequest = function () {
        vm.loader = true;
	        // $http.post("http://localhost:55982/api/test?login=" + $scope.login + "&password=" +  $scope.password)
        $http.post("http://localhost:6557/api/Authorization?login=" + $scope.login + "&password=" +  $scope.password)
             .then(function successCallback(response){
                 $scope.response = response;
    					   document.cookie = "LtpaToken2=" + response.headers("ltpatoken2");
    					   //$rootScope.login = $scope.login;
    					   vm.loader = false;
    					   $scope.authorization = false;

                 console.log('SUCCESS!');

                 $timeout(function () {
        				    $location.path('/');
        				 });

            }, function errorCallback(response){
                console.log("Error ", response);
            });
	    };
    });
