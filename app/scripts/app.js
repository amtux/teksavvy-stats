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
