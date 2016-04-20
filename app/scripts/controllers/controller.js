'use strict';

/**
 * @ngdoc function
 * @name ngSuperShopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngSuperShopApp
 */
angular.module('ngSuperShopApp')

   .controller('MainController', ['$scope', '$rootScope', '$http', 'userservice', function($scope, $rootScope, $http, userservice){


       $scope.swiped = function(direction) {
         alert('Swiped ' + direction);
       };


       $rootScope.$on('$routeChangeStart', function(){
         $rootScope.loading = true;
       });

       $rootScope.$on('$routeChangeSuccess', function(){
         $rootScope.loading = false;
       });

       //
       // 'Drag' screen
       //
       $scope.notices = [];

       for (var j = 0; j < 10; j++) {
         $scope.notices.push({icon: 'envelope', message: 'Notice ' + (j + 1) });
       }

       $scope.deleteNotice = function(notice) {
         var index = $scope.notices.indexOf(notice);
         if (index > -1) {
           $scope.notices.splice(index, 1);
         }
       };

       $rootScope.isLogin = userservice.isLogin();
       $rootScope.currentUser = userservice.currentUser();
       $rootScope.logout = function(){
         userservice.logout();
       }

     $rootScope.$broadcast('bodyClass:add', $scope.bodyClass);

     /****swiper Slider option
     *** get all option
     **http://idangero.us/swiper/api/
     */
     $scope.slider1 ={
             nextButton: '.swiper-button-next',
             prevButton: '.swiper-button-prev',
             paginationClickable: true,
             spaceBetween: 30,
             centeredSlides: true,
             autoplay: 2500,
             effect: 'fade',
             autoplayDisableOnInteraction: false,
         };

         $scope.slider2 ={
           pagination: '.swiper-pagination',
           effect: 'coverflow',
           grabCursor: true,
           centeredSlides: true,
           slidesPerView: 'auto',
           autoplay: 2500,
           loop: true,
           coverflow: {
               rotate: 50,
               stretch: 0,
               depth: 100,
               modifier: 1,
               slideShadows : true
           }
       };

       $scope.slider3={
     	        nextButton: '.arrow-nav-next',
     	        prevButton: '.arrow-nav-prev',
     	        paginationClickable: true,
     	        spaceBetween: 30,
     	        centeredSlides: true,
     	        autoplay: 5000,
     					effect: 'fade',
     	        autoplayDisableOnInteraction: false,
     					loop: true
     	    }

        $scope.slider5 ={
      	        nextButton: '.swiper-button-next',
      	        prevButton: '.swiper-button-prev',
      	        paginationClickable: true,
                autoplay: 5000,
      	        spaceBetween: 30,
      	        centeredSlides: true,
      	        autoplayDisableOnInteraction: false,
                	loop: true
      	    }


   }])
   .controller('MainCtrl',['$scope',   function ($scope) {


    }])
  .controller('ShopSingleClt', ['$scope', '$stateParams', '$http','$timeout', 'PService', 'amCart', function($scope, $stateParams, $http, $timeout, PService, amCart){
    $scope.Productid=$stateParams.id;

    /*-----------Load data if not loaded-----------*/
    if(PService.isEmpty()){
          $http.get('data/products.json').success(function(response){
          PService.init(response);
        });
      }

      $timeout(function(){
          $scope.ps = PService;
          $scope.singleProduct = $scope.ps.getProductByID($stateParams.id);
      },500);

      $scope.amCart=amCart;


  }])

  .controller('amAddtocartClr', ['$scope', function($scope){

  }])


  .controller('cardSummeryclrt', ['$scope', 'amCart',  function($scope, amCart){
    $scope.amCart=amCart;
  } ])


  .controller('amproductclrt', ['$scope', '$timeout', '$http', 'PService',  'amCart', 'amFilterService',
   function($scope, $timeout, $http, PService, amCart, amFilterService){

    if(PService.isEmpty()){
          $http.get('data/products.json').success(function(response){
          PService.init(response);
        });
      }

      $timeout(function(){
          $scope.p=PService;
      },500);

    $scope.amCart=amCart;

    $scope.setProductId=function(id){
      $scope.sproduct=PService.getProductByID(id);
    };
    /* set filter function*/
    $scope.filters=amFilterService;

    /*filterbar toggle*/
    $scope.isFilterbarOpern = true;
    $scope.toggleFilterbar= function(){
        return $scope.isFilterbarOpern = !$scope.isFilterbarOpern
    }

    /*product rzslider slider scope*/
    $timeout(function(){
      $scope.priceRange = {
                minValue: $scope.p.$minPrice,
                maxValue: $scope.p.$maxPrice,
                options: {
                    floor: $scope.p.$minPrice,
                    ceil: $scope.p.$maxPrice,
                    step: 1,
                    onEnd: function(sliderId, modelValue, highValue){
                      $scope.filters.setFilter('priceRange', [modelValue, highValue])
                    }
                }
            };

    },500);

  } ]).controller('login', ['$scope', 'userservice', function($scope, userservice){

    $scope.login= function(){
      if($scope.user.$invalid){
        $scope.user.$setDirty();
      }
      else{
        var user ={
          userName:$scope.userName,
          password:$scope.password
        }
        userservice.login(user);
      }

    }

  }]).controller('registation', ['$scope', 'userservice', function($scope, userservice){

      $scope.save = function(){
        if($scope.user.$invalid){
          $scope.user.$setDirty();

        }else{
          var user= {
            firstName:$scope.firstName,
            lastName:$scope.lastName,
            userName:$scope.userName,
            userEmail:$scope.userEmail,
            password:$scope.password
          };
          userservice.register(user);
        }
      };

      $scope.checkUser = function(){
        userservice.checkUser({userEmail:'mshossain110@yahoo.com'}).success(function(data){
          console.log(data);
        })
      }


  }]);
