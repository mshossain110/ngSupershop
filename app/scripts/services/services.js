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
  }])
  .service('amCart', ['store', function(store){
    this.init= function(){
      this.$Cart={
        items: [],
        shipping: null
      }
    }

    this.addItem= function(id, name, price, quantity, data ){

    }


  }]).factory('amItem', ['$log', function($log){
    var item = function(id, sku, name, price, quantity, data) {
      this.setId(id);
      this.setSku(sku);
      this.setName(name);
      this.setPrice(price);
      this.setQuantity(quantity);
      this.setData(data);
    }
    item.prototype.setId=function(id){
      if(id && typeof id === 'number'){
        this._id=id;
      }else{
        $log.error("A numaric Id must be provided");
      }
    }

    item.prototype.getid=function(){
      return this._id;
    }
    item.prototype.setSku=function(sku){
      if(sku)this._sku=sku;
      else $log.error("A unique sku must be provieded");
    }
    item.prototype.getSku=function(){
      return this._sku;
    }
    item.prototype.setName= function(name){
      if(name && typeof name === 'string') this._name= name;
      else $log.error("A product name must be provieded");
    }
    item.prototype.getName= function(){
      return this._name;
    }
    item.prototype.setPrice=function(price){
      pirce=parseFloat(price);
      if(price >=0 )
        this._price=(price);
      else $log.error("A price must be provided");
    }
    item.prototype.getPrice=function(){
      return this._price;
    }
    item.prototype.setQuantity=function(quantity, relative){
      quantity=parseInt(quantity)
      if(quantity && quantity > 0)
      {
        if(relative === true){
          this._quantity +=quantity;
        }else {
          this._quantity=quantity;
        }
      }else {
        this._quantity=1;
        $log.info("Quantity must be an integer gratter then 0")
      }
    }
    item.prototype.getQuantity=function(){
      return this._quantity;
    }
    item.prototype.getTotal=function(){
      return parseFloat(this.getQuantity() * this.getPrice()).toFixed(2);
    }

    return item;
  }])
  .service('store', ['$window', function($window){
    return {
      get: function(key){
        if($window.localStorage[key]){
          return JSON.parse($window.localStorage[key]);
        }
        return false;
      },
      set: function(key, value){
        if(typeof value === 'undefined'){
          $window.localStorage.removeItem(key);
        }else {
          $window.localStorage[key]= angular.toJson(value);
        }

        return $window.localStorage[key];
      }
    }
  }]);
