'use strict';

/**
 * @ngdoc function
 * @name ngSuperShopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngSuperShopApp
 */
angular.module('ngSuperShopApp')
  .controller('MainCtrl',['$scope', '$http', 'PService', '$log', function ($scope, $http, PService, $log) {
    
    	
    if(!PService.isEmpty()){
        $scope.allproducts=PService.getAllProducts();
      }else{
          $http.get('data/products.json').success(function(response){
           
          PService.setAllProducts(response);

          $scope.allproducts=response;
        });
      }

    
   }])
  .controller('ShopSingleClt', ['$scope', '$routeParams', '$http','PService',function($scope, $routeParams, $http, PService){
    var ProductCode=$routeParams.productID;
      


      if(!PService.isEmpty()){
        $scope.product=PService.getProductByCode(ProductCode);
      }else{
          $http.get('data/products.json').success(function(response){
          PService.setAllProducts(response);
          $scope.product=PService.getProductByCode(ProductCode);
        });
      }


  }]);
///https://docs.google.com/spreadsheets/d/1HHG0VkO8fbgReYk5RpFBb2sVJ29fPCk9HJgcURhN7so/edit?usp=sharing