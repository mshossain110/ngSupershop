'use strict';

/**
 * @ngdoc function
 * @name ngSuperShopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngSuperShopApp
 */
angular.module('ngSuperShopApp')

   .controller('MainController', ['$scope', '$rootScope', function($scope, $rootScope){
     $rootScope.$broadcast('bodyClass:add', $scope.bodyClass);

   }])
   .controller('MainCtrl',['$scope',   function ($scope) {


    }])
  .controller('ShopSingleClt', ['$scope', '$routeParams', '$http','PService',function($scope, $routeParams, $http, PService){
    var Productid=$routeParams.productID;



      if(!PService.isEmpty()){
        $scope.product=PService.getProductByID(Productid);
      }else{
          $http.get('data/products.json').success(function(response){
          PService.setAllProducts(response);
          $scope.product=PService.getProductByID(Productid);
        });
      }


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

  } ]);
