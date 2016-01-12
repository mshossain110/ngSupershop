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
   // shop router
   .state('shop',{
     template: '<ui-view />'
   }).state('shop.page',{
     url: '/shop',
     templateUrl: '/views/shop/shop.html'
   }).state('shop.single',{
     ulr:'/:id',
     templateUrl: '/views/shop/shopSingle.html'
   })


   // elements router
   .state('elements',{
     url: '/elements',
     templateUrl: '/views/ui/elements.html'
   }).state('elements.button',{
     templateUrl:'/views/ui/button.html'
   }).state('elements.heading',{
     templateUrl:'/views/ui/heading.html'
   }).state('elements.conntentbox',{
     templateUrl:'/views/ui/elements.conntentbox.html'
   }).state('elements.carousel',{
     templateUrl:'/views/ui/elements.carousel.html'
   }).state('elements.accordion',{
     templateUrl:'/views/ui/elements.accordion.html'
   }).state('elements.icons',{
     templateUrl:'/views/ui/elements.icons.html'
   }).state('elements.counter',{
     templateUrl:'/views/ui/elements.counter.html'
   }).state('elements.gmaps',{
     templateUrl:'/views/ui/elements.gmaps.html'
   }).state('elements.pricingTable',{
     templateUrl:'/views/ui/elements.pricingTable.html'
   }).state('elements.testimonials',{
     templateUrl:'/views/ui/elements.testimonials.html'
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
