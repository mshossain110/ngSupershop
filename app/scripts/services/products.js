'use strict';

/**
 * @ngdoc service
 * @name ngSuperShopApp.products
 * @description
 * # products
 * Service in the ngSuperShopApp.
 */
angular.module('ngSuperShopApp')
  .factory('products',['$http', '$q', function ($http, $q) {

 		return {
 			getAllProducts: function(){
 				var deferred = $q.defer();
 				return $http.get('data/products.json').success(function(response){
				    	deferred.resolve(response);
				 }).error(function(data){
				 	deferred.reject(data);
				 });

				 return deferred.promise; 				 				
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

