'use strict';

/**
 * @ngdoc service
 * @name ngSuperShopApp.products
 * @description
 * # products
 * Service in the ngSuperShopApp.
 */
angular.module('ngSuperShopApp')
  .factory('PService',['$http', '$q', function ($http, $q) {
  		var products;

 		return {
 			setAllProducts: function(value){
 				products=value;				 				
 			},
 			getAllProducts: function(){
 				return products;
 			},
 			isEmpty : function(){
 				if( typeof products != 'object'){
 					return true;
 				}else{
 					return false;
 				}
 			},
 			getProductByCode: function(code){
 				var product;
 				if(!this.isEmpty()){
 					for(product of products){
	 					if(product.sku === code){
	 						return product;
	 					}

 					}
 				}
 				
 			},
 			getSingleProduct: function(){
 				var deferred = $q.defer();
 				 $http.get('data/ProductDetails.json').then(function(response){
 				 	deferred.resolve(response);
 				 }, function(error){
 				 	deferred.reject(error);
 				 });

 				  return deferred.promise; 
 			}
 		};
  }]);

