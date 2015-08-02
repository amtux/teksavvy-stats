'use strict';

/**
 * @ngdoc overview
 * @name teksavvyStatsApp
 * @description
 * # teksavvyStatsApp
 *
 * Main module of the application.
 */
angular
  .module('teksavvyStatsApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'nvd3ChartDirectives',
    'ui.mask'
  ])
  .constant("apiConfig", {
        "url": "//localhost",
        "port": "3000"
    })
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/daily', {
        templateUrl: 'views/daily.html',
        controller: 'DailyCtrl',
        controllerAs: 'daily'
      })
      .when('/monthly', {
        templateUrl: 'views/monthly.html',
        controller: 'MonthlyCtrl',
        controllerAs: 'monthly'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
