'use strict';
angular
    .module('app.core')
    .controller('CabinetController', function($scope, $http, $location, $timeout) {
      var vm = this;
      $scope.goToDesktop = function(){
        $timeout(function () {
           $location.path('/desktop');
       });
      }
    });
