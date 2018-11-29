'use strict';
angular
    .module('app.core')
    .controller('HomeController', function($scope, $http, $cookies, $timeout, $location, ShowService) {


        $scope.executeProcessByPost = function () {
	        console.log("Start executeProcessByPost");
	        this.loader = true;

	        var config = {
              headers: {
  			        'Content-Type': 'application/json',
  			        'BpmToken': ShowService.getCookie('LtpaToken2')
    			    },
    			    withCredentials: true
          }

            //let paramsObject = {"searchClient": {"userName": $rootScope.login,"searchType": "IIN","iin": $scope.iin}};
          let paramsObject = {"searchClient": {"userName": "bimat_bk","searchType": "IIN","iin": $scope.iin}};

	        console.log(paramsObject);

	        $http.post("http://localhost:6557/api/ExecuteProcess/", paramsObject,  config)
	            .then(function successCallback(response){
	                $scope.response = response;
	                console.log(response.data);

	                //$cookies.JSESSIONID = $cookies.get('JSESSIONID');

	                $scope.instance_id = response.data.data.piid;

	            }, function errorCallback(response){
	                console.log("Error ", response);
	            })
	            .then(function success(response){
	            	var getStatusDataPromise = $scope.getStatusData($scope.instance_id);

	            	getStatusDataPromise.then(function(responseStatus) {
      					  console.log(responseStatus);
      					});

	            });
	    };

      $scope.getStatusData = function (instance_id) {

	    	var config = {
            headers: {
	               'BpmToken': ShowService.getCookie('LtpaToken2')
  			    },
  			    withCredentials: true
        }

        return $http.get("http://localhost:6557/api/GetInstanceDetails?process_id=" + instance_id, config)
           .then(function successCallback(response){

              console.log('This is status response', response.data);

              console.log(response.headers());

              if(response.data.data.state != "STATE_FINISHED"){
              	$scope.getStatusData(response.data.data.piid);

                $timeout(function () {
                   $location.path('/cabinet');
                });

              }else if(response.data.data.state == "STATE_FINISHED"){
              	$scope.loader = false;
              	$scope.instance_status1 = response.data.data.state;
              	return $scope.instance_status1;
              }

          }, function errorCallback(response){
              console.log("Error ", response);
          });
	     };

    });
