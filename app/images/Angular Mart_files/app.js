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
    'duScroll',
    'angularMart.Service'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider) {



   $urlRouterProvider.otherwise("/");

   $stateProvider


   .state('home',{
     url:'/',

     views: {
       "footer": {templateUrl: 'views/templates/footer.html'},
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
     template: '<ui-view />'
   }).state('elements.element',{
     url: '/elements',
     templateUrl: '/views/ui/elements.html'
   }).state('elements.button',{
     url:'/buttons',
     views:{
       "": {templateUrl:'/views/ui/button.html'}
     }
   }).state('elements.heading',{
     url: '/heading',
     templateUrl:'/views/ui/heading.html'
   }).state('elements.conntentbox',{
     url: '/conntentbox',
     templateUrl:'/views/ui/elements.conntentbox.html'
   }).state('elements.carousel',{
     url:'/carousel',
     templateUrl:'/views/ui/elements.carousel.html'
   }).state('elements.accordion',{
     url: '/accordion',
     templateUrl:'/views/ui/elements.accordion.html'
   }).state('elements.icons',{
     url:'/icons',
     templateUrl:'/views/ui/elements.icons.html',
     data : {
       title: 'Icons'
     }
   }).state('elements.iconseffect',{
     url: '/iconseffect',
     templateUrl:'views/ui/element.iconsEffect.html'
   }).state('elements.counter',{
     url: '/counter',
     templateUrl:'/views/ui/elements.counter.html'
   }).state('elements.gmaps',{
     url: '/gmaps',
     templateUrl:'/views/ui/elements.gmaps.html'
   }).state('elements.pricingTable',{
     url: '/pricingTable',
     templateUrl:'/views/ui/elements.pricingTable.html'
   }).state('elements.testimonials',{
     url:'/testimonials',
     templateUrl:'/views/ui/elements.testimonials.html'
   }).state('elements.callToAction',{
     url: '/callToAction',
     templateUrl:'/views/ui/elements.callToAction.html'
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
