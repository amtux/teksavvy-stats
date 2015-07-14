'use strict';

/**
 * @ngdoc function
 * @name teksavvyStatsApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the teksavvyStatsApp
 */
angular.module('teksavvyStatsApp')
  .controller('MainCtrl', function($scope, $http) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];

    $scope.someFun = function() {
      var apiKey = $scope.apiKey;
      console.log(apiKey);
      var url = "http://public-api.wordpress.com/rest/v1/sites/wtmpeachtest.wordpress.com/posts?callback=JSON_CALLBACK";

$http.jsonp(url)
    .success(function(data){
        console.log(data.found);
    });

      // var url = "https://api.teksavvy.com/web/Usage/UsageSummaryRecords";
      // $http({
      //     method: 'JSONP',
      //     url: url
      // })
      // .success(function(status) {
      //   console.log(status);
      //     //your code when success
      // })
      // .error(function(status) {
      //     //your code when fails
      // });


      var isKeyTestValid = /^[0-9A-Fa-f]{32}$/i.test(apiKey);
      if (isKeyTestValid) {
        console.log("VALID");
      } else {
        console.log("INVALID");
      }
    };
  });