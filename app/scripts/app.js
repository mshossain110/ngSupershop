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
    'mobile-angular-ui',
    'mobile-angular-ui.gestures',
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
   });
  })
  .run(['$rootScope','amCart', 'store', '$window', '$timeout', function($rootScope, amCart, store, $window, $timeout){
     $rootScope.$on('amCart:change', function(evnt, data){
       amCart.save();
     });

     $rootScope.$on('bodyClass:add', function(event, data){
        angular.element('body').addClass(data);
     });
    if(angular.isObject(store.get('amCart'))){
      amCart.restore(store.get('amCart'));
    }else{
      amCart.init();
    }

    var w=angular.element($window);

    $timeout(function () {
      $rootScope.isNotMobile = false;
      if(window.outerWidth < 770)
      {
        $rootScope.isNotMobile  =true;
      }

    }, 10);


  }])
  ;
