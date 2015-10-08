'use strict';

/**
 * @ngdoc overview
 * @name assessApp
 * @description
 * # assessApp
 *
 * Main module of the application.
 */
angular
  .module('assessApp', [
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/musicbrainz', {
        templateUrl: 'views/musicbrainz.html',
        controller: 'musicbrainzCtrl',
        controllerAs: 'musicbrainz'
      })
      .when('/favourates', {
        templateUrl: 'views/favourates.html',
        controller: '',
        controllerAs: ''
      })
      .otherwise({
        redirectTo: '/'
      });
  });
