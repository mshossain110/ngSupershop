'use strict';

/**
 * @ngdoc function
 * @name ngSuperShopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngSuperShopApp
 */
angular.module('ngSuperShopApp')
  .controller('MainCtrl',['$scope', 'products', '$log', function ($scope, products, $log) {
    
    	$scope.products= products.getAllProducts();
    	$scope.products.then(function(response){
    		$scope.products=response.data;
    	})
    
   }])
  .controller('ShopSingleClt', ['$scope', '$routeParams', '$http','$log','$sce',function($scope, $routeParams, $http, $log, $sce){
    var ProductCode=$routeParams.productID;
        $http.get('data/ProductDetails.json').then(function(response){

              for(var i of response.data){
                
                if(i.code === ProductCode){
                 $scope.product = i;
                 $log.log()

                }
              }
             
        });        


  }]);
