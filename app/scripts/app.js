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
    'ngResource',
    'ngMessages',
    'ui.router',
    'mobile-angular-ui',
    'mobile-angular-ui.gestures',
    'ngSanitize',
    'rzModule',
    '720kb.socialshare',
    'angularMart.Service',
    'angularMart.Filter'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    // $httpProvider interceptors
    $httpProvider.interceptors.push('authInterceptor')

   $urlRouterProvider.otherwise("/");

   $stateProvider


   .state('home',{
     url:'/',
     templateUrl: 'views/main.html'
   }).state('home2',{
     url: '/home2',
     templateUrl: '/views/pages/home2.html'
   }).state('home3',{
     url: '/home3',
     templateUrl: '/views/pages/homeresturent.html'
   }).state('aboutUs',{
     url: '/about-us',
     templateUrl: '/views/pages/about.html'
   })
   // shop router
   .state('shop',{
     url: '/shop',
     template: '<ui-view />'
   }).state('shop.leftsidebar',{
     url: '/shopleft',
     templateUrl: '/views/shop/shop.html'
   }).state('shop.rightsidebar',{
     url: '/shopright',
     templateUrl: '/views/shop/shopright.html'
   }).state('shop.topsidebar',{
     url: '/shoptop',
     templateUrl: '/views/shop/shoptop.html'
   })
   .state('shop.single',{
     url:'/:id',
     controller: 'ShopSingleClt',
     templateUrl: '/views/shop/shopSingle.html'
   })

   .state('login',{
     url:'/login',
     controller: 'login',
     templateUrl: '/views/user/login.html'
   }).state('registation',{
     url:'/registation',
     controller: 'registation',
     templateUrl: '/views/user/registation.html'
   }).state('userprofile',{
     url:'/userprofile',
     controller: 'userprofile',
     templateUrl: '/views/user/userprofile.html'
   })
   //blog state
   .state('blog',{
     url:'/blog',
      template: '<ui-view />'
   }).state('blog.listSidebar',{
     url:'/list-sidebar',
     templateUrl: '/views/blogs/listSidebar.html'
   }).state('blog.listClasic',{
     url:'/list-clasic',
     templateUrl: '/views/blogs/listClasic.html'
   }).state('blog.gridStyle',{
     url:'/list-gridstyle',
     templateUrl: '/views/blogs/gridStyle.html'
   }).state('blog.gridStyle2',{
     url:'/list-gridstyle2',
     templateUrl: '/views/blogs/gridStyle2.html'
   }).state('blog.gridStylefull',{
     url:'/list-gridStylefull',
     templateUrl: '/views/blogs/gridStylefull.html'
   }).state('blog.single',{
     url:'/single',
     templateUrl: '/views/blogs/single.html'
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
   }).state('elements.tabs',{
     url: '/tabs',
     templateUrl:'/views/ui/elements.tabs.html'
   }).state('elements.modal',{
     url: '/modal',
     templateUrl:'/views/ui/elements.modal.html'
   }).state('elements.carosal2',{
     url: '/carosal2',
     templateUrl:'/views/ui/elements.carosal2.html'
   }).state('elements.dragtodismis',{
     url: '/dragtodismis',
     templateUrl:'/views/ui/elements.dragtodismis.html'
   }).state('elements.swip',{
     url: '/swip',
     templateUrl:'/views/ui/elements.swip.html'
   }).state('elements.touch',{
     url: '/touch',
     templateUrl:'/views/ui/elements.touch.html'
   }).state('elements.drag2',{
     url: '/drag2',
     templateUrl:'/views/ui/elements.drag2.html'
   });

  })
  .run(['$rootScope','amCart', 'store', '$window', '$timeout', function($rootScope, amCart, store, $window, $timeout){

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){
          $( ".scrollable-content" ).scrollTop( 0 );
      })


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


  }]).constant('API', 'http://127.0.0.1:3000/');
  ;
