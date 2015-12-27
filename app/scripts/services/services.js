'use strict';

/**
 * @ngdoc service
 * @name ngSuperShopApp.products
 * @description
 * # products
 * Service in the ngSuperShopApp.
 */
angular.module('angularMart.Service', [])
  .service('PService', ['$http', '$q', function ($http, $q) {
  		var $products;


 			this.setAllProducts= function(value){
 				this.$products=value;
 			};
 			this.getAllProducts= function(){
 				return this.$products;
 			};
 			this.isEmpty = function(){
 				if( typeof this.$products === 'object' && this.$products.length > 0 ){
 					return false;
 				}else{
 					return true;
 				}
 			};
      this.getProductByID=function(ids){

        if(Array.isArray(ids)){
          var productByID=[];
          angular.forEach(this.getAllProducts(), function(product){
            if(ids.indexOf(product.ID) > -1){
              productByID.push(product);
            }
          });
        }else{
          var productByID;
          angular.forEach(this.getAllProducts(), function(product){
            if(product.ID === id){
              productByID=product;

            }
          });
        }

        return productByID;
      };

      this.getProductByCategory=function(category, number){
        var productByCategory=[];
        if(typeof category=== 'undefined') return false;
         var num = number ? parseInt(number, 10): null;
        angular.forEach(this.getAllProducts(), function(item){
          if(item.category === category && (num >0 || num==null )){
            productByCategory.push(item);
            if(num!=null)
                num--;
          }
        });

        return productByCategory;
      };

  }])
  .service('amCart', ['amItem', 'store', function(amItem, store){
    this.init= function(){
      this.$cart={
        items: [],
        shipping: null
      }
    }

    this.addItem= function(id, name, price, quantity, data ){
      var inCart= this.getItemById(id);
      if(typeof inCart === 'object' ){
        inCart.setQuantity(quantity, true);
      }else{
        var newItem= new amItem(id, name, price, quantity, data);
        this.$cart.items.push(newItem);

      }
      this.save();
    };

    this.getItemById=function(id){
      var items= this.getCart().items;
      var iditem;
      angular.forEach(items, function(item){
        if(item.getId()===id){
          iditem=item;
        }
      });
      return iditem;
    };
    this.getCart=function(){
      return this.$cart;
    };
    this.setCart=function(cart){
      this.$cart=cart;
      return this.getCart();
    }
    this.setShipping=function(shipping){
      this.$cart.shipping=shipping;
      return this.getShipping();
    };
    this.getShipping=function(){
      if(this.$cart.shipping !='null')
        return this.$cart.shipping;
    }

    this.getAllItems=function(){
      return this.$cart.items;
    }

    this.getTotalItems=function(){
      var count=0;
      var items=this.$cart.items;
      angular.forEach(items, function(item){
        count +=item.getQuantity();
      })
      return count;
    }
    this.getSubTotal=function(){
      var total=0;
      var items =this.$cart.items;
      angular.forEach(items, function(item){
        total += parseFloat(item.getTotal()) ;
      });
      return total;
    };

    this.removeItemById=function(id){
      var cart=this.getCart();
      angular.forEach(cart.items, function(item, index){
        if(item.getId()===id){
          cart.items.splice(index, 1);
        }
      });
      this.setCart(cart);
    }
    this.isEmpty=function(){
    return this.getCart().items.length >0 ? false: true;
    }
    this.toObject=function(){
      if(this.getCart().items.length <0) return false;

      var items=[];
      angular.forEach(this.getAllItems(), function(item){
        items.push(item.toObject());

      });

      return{
        shipping:this.getShipping(),
        subTotal: this.getSubTotal(),
        items: items
      }

    }


    this.save=function(){
      return store.set('amCart', JSON.stringify(this.toObject()));
    };


  }])

  .factory('amItem', ['$log', function($log){
    var item = function(id, name, price, quantity, data) {
      this.setId(id);
      this.setName(name);
      this.setPrice(price);
      this.setQuantity(quantity);
      this.setData(data);
    };
    item.prototype.setId=function(id){
      if(id && typeof id === 'number'){
        this._id=id;
      }else{
        $log.error("A numaric Id must be provided");
      }
    };

    item.prototype.getId=function(){
      return this._id;
    };
    item.prototype.setName= function(name){
      if(name && typeof name === 'string') this._name= name;
      else $log.error("A product name must be provieded");
    };
    item.prototype.getName= function(){
      return this._name;
    };
    item.prototype.setPrice=function(price){
      var pricef = parseFloat(price);
      if(pricef >=0 )
        this._price=(pricef);
      else $log.error("A price must be provided");
    };
    item.prototype.getPrice=function(){
      return this._price;
    };
    item.prototype.setQuantity=function(quantity, relative){
      var quantityi=parseInt(quantity, 10);
      if(quantityi && quantityi > 0)
      {
        if(relative === true){
          this._quantity +=quantityi;
        }else {
          this._quantity=quantityi;
        }
      }else {
        this._quantity=1;
        $log.info("Quantity must be an integer gratter then 0")
      }
    };
    item.prototype.getQuantity=function(){
      return this._quantity;
    };
    item.prototype.setData=function(data){
      if(data) this._data=data;
    };
    item.prototype.getData=function(){
      if(this._data)
        return this._data;
        else $log.info("This item has not set any data");
    };
    item.prototype.getTotal=function(){
      return parseFloat(this.getQuantity() * this.getPrice()).toFixed(2);
    };
    item.prototype.toObject=function(){
      return {
        id : this.getId(),
        name: this.getName(),
        price: this.getPrice(),
        quantity: this.getQuantity(),
        data:this.getData(),
        total:this.getTotal()
      }
    };

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
          $window.localStorage[key]=value;
        }

        return $window.localStorage[key];
      }
    }
  }]);
