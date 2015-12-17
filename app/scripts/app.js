'use strict';

/**
 * @ngdoc overview
 * @name ngSuperShopApp
 * @description
 * # ngSuperShopApp
 *
 * Main module of the application.
 */
angular
  .module('ngSuperShopApp', [
    'ngAnimate',
    'ngCookies',
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
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      }).when('/shop/:productID', {
        templateUrl: 'views/shopSingle.html',
        controller: 'ShopSingleClt',
        controllerAs: 'ShopSingle'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
