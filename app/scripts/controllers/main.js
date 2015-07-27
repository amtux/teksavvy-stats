'use strict';

/**
 * @ngdoc function
 * @name teksavvyStatsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the teksavvyStatsApp
 */
angular.module('teksavvyStatsApp')
  .controller('MainCtrl', function($scope, $http, uiMaskConfig) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    uiMaskConfig.maskDefinitions.H = /[0-9a-fA-F]/;

    $scope.validationError = false;


    $scope.useKey = function(api) {
      $scope.apiKey = angular.copy(api);

      var url = '//localhost:3000/validate/' + $scope.apiKey;
      $http.get(url)
        .success(function(data) {
          if (data.valid === 'true') {
            console.log('valid');
            $scope.validationError = false;
          } else {
            $scope.validationError = true;
          }
          console.log(data);
        })
        .error(function(status) {
          console.log('Error validating key via GET on: ' + url + ', status: ' + status);
        });

    };
  });