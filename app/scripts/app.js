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
    'ngTouch',
    'angularMart.Service'
  ])
  .config(function ($routeProvider) {
   return $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/about', {
        templateUrl: 'views/pages/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
      .when('/shop/:productID', {
        templateUrl: 'views/shop/shopSingle.html',
        controller: 'ShopSingleClt',
        controllerAs: 'ShopSingle'
      })
      .when('/shop', {
        templateUrl: 'views/shop/shop.html',
        controller: 'ShopSingleClt',
        controllerAs: 'ShopSingle'
      })
      .when('/features', {
          templateUrl:'views/ui/features.html',
          controller:'featuresCont'
      })
      .when('/ui/typography', {
        templateUrl: 'views/ui/typography.html'
      })
      .when('/ui/button', {
        templateUrl: 'views/ui/button.html'
      })
      .when('/ui/icons', {
        templateUrl: 'views/ui/icons.html'
      })
      .when('/ui/grids', {
        templateUrl: 'views/ui/grids.html'
      })
      .when('/ui/price-table', {
        templateUrl: 'views/ui/price-table.html'
      })
      .when('/ui/timeline', {
        templateUrl: 'views/ui/timeline.html'
      })
      .when('/singup', {
        templateUrl: 'views/pages/signup.html'
      })
      .when('/singin', {
        templateUrl: 'views/pages/signin.html'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .run(['amCart', 'store', function(amCart, store){
    /* $rootScope.$on('amCart:change', function(evnt, data){
    //   amCart.save();
    // });
    */

    if(angular.isObject(store.get('amCart'))){
      amCart.restore(store.get('amCart'))
    }else{
      amCart.init();
    }

  }])
  ;
