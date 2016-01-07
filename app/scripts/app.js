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
    'ui.router',
    'ngSanitize',
    'ngTouch',
    'angularMart.Service'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
   $urlRouterProvider.otherwise("/");

   $stateProvider


   .state('home',{
     url:'/',

     views: {
        "slider": { templateUrl: "views/slider/frontPage-classic.html" },
        "": {templateUrl: 'views/main.html'}
      }
   })
   .state('elements',{
     url: '/elements'
   })
   .state('elements.button',{
     url: '/button',
     templateUrl:'/views/ui/button.html'
   })
  })
  .run(['$rootScope','amCart', 'store', function($rootScope, amCart, store){
     $rootScope.$on('amCart:change', function(evnt, data){
       amCart.save();
     });


    if(angular.isObject(store.get('amCart'))){
      amCart.restore(store.get('amCart'))
    }else{
      amCart.init();
    }

  }])
  ;
