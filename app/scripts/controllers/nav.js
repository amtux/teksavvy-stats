'use strict';

/**
 * @ngdoc function
 * @name teksavvyStatsApp.controller:NavCtrl
 * @description
 * # NavCtrl
 * Controller of the teksavvyStatsApp
 */
angular.module('teksavvyStatsApp')
  .controller('NavCtrl', function ($scope, $location) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.isActive = function (viewLocation) { 
        return viewLocation === $location.path();
    };
  });
