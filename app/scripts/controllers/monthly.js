'use strict';

/**
 * @ngdoc function
 * @name teksavvyStatsApp.controller:MonthlyCtrl
 * @description
 * # MonthlyCtrl
 * Controller of the teksavvyStatsApp
 */
angular.module('teksavvyStatsApp')
  .controller('MonthlyCtrl', function($scope, $http, $cookies, apiConfig) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.xFunction = function() {
      return function(d) {
        return d.key;
      };
    };
    $scope.yFunction = function() {
      return function(d) {
        return d.y;
      };
    };

    $scope.displayData = [];

    if ($cookies.get('TekSavvy-APIKey')) {
      $scope.showKey = true;
      $scope.apiKeyValue = $cookies.get('TekSavvy-APIKey');

      var url = apiConfig.url + ':' + apiConfig.port + '/summary/' + $scope.apiKeyValue;
      $http.get(url)
        .success(function(data) {
          $scope.monthlyData = data.value;
          console.log($scope.monthlyData);

          for (var i = 0; i < $scope.monthlyData.length; i++) {
            var temp = [{
              key: "On Peak Upload (GB)",
              y: $scope.monthlyData[i].OnPeakUpload
            }, {
              key: "On Peak Download (GB)",
              y: $scope.monthlyData[i].OnPeakDownload
            }, {
              key: "Off Peak Upload (GB)",
              y: $scope.monthlyData[i].OffPeakUpload
            }, {
              key: "Off Peak Download (GB)",
              y: $scope.monthlyData[i].OffPeakDownload
            }];
            $scope.displayData.push(temp);
          }

        })
        .error(function(status) {
          console.log('Error validating key via GET on: ' + url + ', status: ' + status);
        });
    } else {
      $scope.showKey = false;
    }

  });