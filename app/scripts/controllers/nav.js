'use strict';

/**
 * @ngdoc function
 * @name teksavvyStatsApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the teksavvyStatsApp
 */
angular.module('teksavvyStatsApp')
  .controller('NavCtrl', function ($scope, $location, $cookies, $window) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };

    if ($cookies.get('TekSavvy-APIKey')) {
      $scope.showKey = true;
      $scope.apiKeyValue = $cookies.get('TekSavvy-APIKey');
    } else {
      $scope.showKey = false;
    }

    $scope.revokeApiKey = function() {
      if($cookies.get('TekSavvy-APIKey')) {
        $cookies.remove('TekSavvy-APIKey');
        $window.location.reload();
      }
    };
  });
