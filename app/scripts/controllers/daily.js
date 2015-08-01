'use strict';

/**
 * @ngdoc function
 * @name teksavvyStatsApp.controller:DailyCtrl
 * @description
 * # DailyCtrl
 * Controller of the teksavvyStatsApp
 */
angular.module('teksavvyStatsApp')
  .controller('DailyCtrl', function($scope, $http, $cookies) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    function cleanDec(dec) {
      return Math.floor(dec * 100) / 100;
    }

    $scope.onPeakUsage = [];
    $scope.offPeakUsage = [];

    $scope.curOffUpload = [];
    $scope.curOffDownload = [];
    $scope.curOnUpload = [];
    $scope.curOnDownload = [];

    $scope.longTermData = [];
    $scope.thisMonthData = [];
    $scope.total = [];

    $scope.xAxisLongTerm = function() {
      return function(d) {
        return d3.time.format('%x')(new Date(d)); // jshint ignore:line
      };
    };

    $scope.xAxisThisMonth = function() {
      return function(d) {
        return d3.time.format('%e')(new Date(d)); // jshint ignore:line
      };
    };

    if ($cookies.get('TekSavvy-APIKey')) {
      $scope.showKey = true;
      $scope.apiKeyValue = $cookies.get('TekSavvy-APIKey');

      var url = '//localhost:3000/records/' + $scope.apiKeyValue;
      $http.get(url)
        .success(function(data) {
          $scope.dailyData = data.value;

          var startOfMonth = new Date();
          startOfMonth.setDate(1);
          startOfMonth.setHours(0, 0, 0, 0);

          for (var i = 0; i < $scope.dailyData.length; i++) {
            var elem = $scope.dailyData[i];
            var tempDate = new Date(elem.Date);
            tempDate.setMinutes(tempDate.getMinutes() + tempDate.getTimezoneOffset());

            var off = elem.OffPeakDownload + elem.OffPeakUpload;
            var on = elem.OnPeakDownload + elem.OnPeakUpload;
            var tot = on + off;

            if (tempDate >= startOfMonth) {
              $scope.curOffUpload.push([tempDate, cleanDec(elem.OffPeakUpload)]);
              $scope.curOffDownload.push([tempDate, cleanDec(elem.OffPeakDownload)]);
              $scope.curOnUpload.push([tempDate, cleanDec(elem.OnPeakUpload)]);
              $scope.curOnDownload.push([tempDate, cleanDec(elem.OnPeakDownload)]);
            }

            $scope.offPeakUsage.push([tempDate, cleanDec(off)]);
            $scope.onPeakUsage.push([tempDate, cleanDec(on)]);
            $scope.total.push([tempDate, cleanDec(tot)]);
          }

          $scope.thisMonthData = [{
            "key": "On-peak Upload (GB)",
            "values": $scope.curOnUpload
          }, {
            "key": "On-peak Download (GB)",
            "values": $scope.curOnDownload
          }, {
            "key": "Off-peak Upload (GB)",
            "values": $scope.curOffUpload
          }, {
            "key": "Off-peak Download (GB)",
            "values": $scope.curOffDownload
          }];

          $scope.longTermData = [{
            "key": "On-peak usage (GB)",
            "bar": true,
            "values": $scope.onPeakUsage
          }, {
            "key": "Off-peak usage (GB)",
            "bar": true,
            "values": $scope.offPeakUsage
          }, {
            "key": "Total usage (GB)",
            "area": true,
            "values": $scope.total
          }];
        })
        .error(function(status) {
          console.log('Error validating key via GET on: ' + url + ', status: ' + status);
        });
    } else {
      $scope.showKey = false;
    }
  });