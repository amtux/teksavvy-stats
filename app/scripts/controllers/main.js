'use strict';

/**
 * @ngdoc function
 * @name teksavvyStatsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the teksavvyStatsApp
 */
angular.module('teksavvyStatsApp')
  .controller('MainCtrl', function($scope, $http, uiMaskConfig, $cookies, $window, apiConfig) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    uiMaskConfig.maskDefinitions.H = /[0-9a-fA-F]/;

    $scope.validationError = false;

    if ($cookies.get('TekSavvy-APIKey')) {
      $scope.showKey = true;
      $scope.apiKeyValue = $cookies.get('TekSavvy-APIKey');
    } else {
      $scope.showKey = false;
    }

    $scope.useKey = function(apiKey) {
      $scope.apiKey = angular.copy(apiKey);

      var url = apiConfig.url + ':' + apiConfig.port + '/validate/' + $scope.apiKey;
      $http.get(url)
        .success(function(data) {
          if (data.valid === 'true') {
            var expireDate = new Date();
            expireDate.setDate(expireDate.getDate() + 180);
            $cookies.put('TekSavvy-APIKey', apiKey, {expires: expireDate});
            $scope.validationError = false;
            $window.location.reload();
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