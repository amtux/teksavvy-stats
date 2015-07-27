'use strict';

/**
 * @ngdoc function
 * @name teksavvyStatsApp.controller:MonthlyCtrl
 * @description
 * # MonthlyCtrl
 * Controller of the teksavvyStatsApp
 */
angular.module('teksavvyStatsApp')
  .controller('MonthlyCtrl', function () {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    if ($cookies.get('TekSavvy-APIKey')) {
      $scope.showKey = true;
      $scope.apiKeyValue = $cookies.get('TekSavvy-APIKey');
    } else {
      $scope.showKey = false;
    }

    if value.

  });
