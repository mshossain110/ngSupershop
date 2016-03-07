'use strict';

/**
 * @ngdoc service
 * @name ngSuperShopApp.products
 * @description
 * # products
 * Service in the ngSuperShopApp.
 */
angular.module('angularMart.Service', [])
  .factory('auth', ['$window', function($window){
      var auth ={};

      auth.parseJWT = function(token){
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace('-', '+').replace('_', '/');
        return JSON.parse($window.atob(base64));
      };

      auth.saveToken = function(token){
        $window.localStorage['am-auth'] = token;
      };

      auth.getToken = function(){
        return $window.localStorage['am-auth']
      };

      auth.removeToken = function(){
        $window.localStorage.removeItem('am-auth');
      };


      return auth;
  }])
  .factory('authInterceptor', ['API', 'auth', function(API, auth){
    return {
      'request': function(config){
        var token = auth.getToken();

        if(config.url.indexOf(API) === 0 && token){
          config.headers.Authorization = 'Bearer ' + token;
        }

        return config;
      },
      'response':function(response){
          if(response.config.url.indexOf(API) ===0 && response.data.token){
            auth.saveToken(response.data.token);
          }

          return response;
      }
    }
  }])
  .service('userservice', ['$http','API', 'auth', function($http, API, auth){
      var user= {};

      user.getQuote = function(){
        return $http.get(API+ 'users/quote');
      };

      user.register = function(user){
        return $http.post(API + 'users/register', user);
      };

      user.login = function(user){
        return $http.post(API + 'users/login', user);
      };

      user.isLogin = function(){
        var token = auth.getToken();

        if(token){
          var parse = auth.parseJWT(token);

          return Math.round(Date.now()/1000) < parse.exp;
        }else{
          return false;
        }

      };

      user.currentUser = function(){
        var token = auth.getToken();

        if(token){
          var parse = auth.parseJWT(token);

          return parse.userName;
        }
      };

      user.logout = function(){
        auth.removeToken();
      };

      user.checkUser =  function(user){
          return $http.get(API + 'users/checkuser', user);
      }

      return user;
  }])
  .service('PService', [ '$timeout', '$sce', function ($timeout, $sce) {
  		var $products, $minPrice, $maxPrice, $categories=[], $colors=[], $sizes=[], $brands=[];

      this.init = function(value){
        this.$products=value;
        var $that = this;
        $timeout(function(){
          $that.setVariable();
        }, 100);
      }

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

        if(_.isArray(ids)){
            var productByID=[];
          _.forEach(this.getAllProducts(), function(product){
            if(_.indexOf(ids, product.ID) > -1){
              productByID.push(product);
            }
          });
        }else{

            var productByID;
          productByID=  _.find(this.getAllProducts(), function(o) { return o.ID === parseInt(ids, 10); });
            console.log(productByID)
        }

        return productByID;
      };

      this.getAllCategory=function(products){
        if(undefined === products ) products =this.$products;
          var category=[];
        _.forEach(products, function(product){
            if(_.indexOf(category, product.category) ===-1){
              category.push(product.category);
            }
        });
        return category;
      };

      this.getProductByCategory=function(category, number){
        var productByCategory=[];
        if(typeof category=== 'undefined') {return false;}
        var num = number ? parseInt(number, 10): null;
        var cat=[];
        if(_.isArray(category)){
          _.forEach(category, function(c){
            cat.push(c.toLowerCase());
          });
        }else {
          cat.push(category.toLowerCase());
        }

        angular.forEach(this.getAllProducts(), function(product){
          if(cat.indexOf(product.category.toLowerCase()) > -1 && (num >0 || num===null )){
            productByCategory.push(product);
            if(num!==null){
              num--;
            }

          }
        });
        return productByCategory;
      };

      this.setVariable = function(){
            var minPrice=1000, maxPrice=0, categories=[], colors=[], sizes=[], brands=[], products = this.$products;

            _.forEach(products, function(product){
              var price = parseInt(product.price, 10)
                minPrice = price <= minPrice ? price: minPrice;
                maxPrice = price >= maxPrice ? price: maxPrice;

                if(product.category) categories.push(product.category.toLowerCase());
                if(product.brand ) brands.push(product.brand.toLowerCase());

                if(product.colors && _.isArray(product.colors)){
                  _.forEach(product.colors, function(color){
                      colors.push(color.toLowerCase()) ;
                  });
                }

                if(product.colors && _.isArray(product.sizes)){
                  _.forEach(product.sizes, function(size){
                      sizes.push(size.toLowerCase()) ;
                  });
                }
            });
             this.$minPrice = minPrice;
             this.$maxPrice = maxPrice;
             this.$categories = _.uniq(categories);
             this.$brands = _.uniq(brands);
             this.$colors = _.uniq(colors);
             this.$sizes = _.uniq(sizes);
      };

      this.HTMLParsing = function(html){
          return $sce.trustAsHtml(html);
      }

  }])
  /*-------------------filter service--------------------------*/
  .service('amFilterService', [ function(){
      var $filters;
      this.setFilter = function(key, value){
        var filters=this.$filters || [];

        var existingFilter = _.some(filters, {'type': key} );
        if(existingFilter){
            _.forEach(filters, function(filter){
              if(filter.type ===key){
                if(key !=='priceRange'){
                    var idx= _.indexOf(filter.option, value);
                    if(idx >-1){
                      filter.option.splice(idx, 1);
                    }else{
                      filter.option.push(value.toLowerCase());
                    }
                }else{
                  filter.option =[];
                  filter.option=[value[0], value[1]];
                }
              }
            })
        }else{
          var filter ={}
          filter.type= key.toLowerCase();
          filter.option =[];
          if(key !=='priceRange'){
            filter.option.push(value.toLowerCase());
          }else{
            filter.option =[value[0], value[1]];
          }
          filters.push(filter);
        }
        this.$filters = filters;
      };

      this.isInFilterList = function( key, vlaue){
        return _.some(this.$filters, { 'type': key, 'option':[value]});
      };

  }])
  /* ----------------service for cart ----------------------------*/
  .service('amCart', ['$rootScope', 'AmItem', 'store', function($rootScope, AmItem, store){
    this.init= function(){
      this.$cart={
        items: [],
        shipping: null
      };
    };

    this.addItem= function(id, name, image, price, quantity, data){
      var inCart= this.getItemById(id);
      if(typeof inCart === 'object' ){
        inCart.setQuantity(quantity, false);
        $rootScope.$broadcast('amCart:update', inCart);
      }else{
        var newItem= new AmItem(id, name, image, price, quantity, data);
        this.$cart.items.push(newItem);
         $rootScope.$broadcast('amCart:add', newItem);
      }
       $rootScope.$broadcast('amCart:change', {});
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
    };


    this.setShipping=function(shipping){
      this.$cart.shipping=shipping;
      return this.getShipping();
    };


    this.getShipping=function(){
      if(this.$cart.shipping !=='null'){
        return this.$cart.shipping;
      }

    };


    this.getAllItems=function(){
      return this.$cart.items;
    };

    this.getTotalItems=function(){
      var count=0;
      var items=this.$cart.items;
      angular.forEach(items, function(item){
        count +=item.getQuantity();
      });
      return count;
    };


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
      var removedItem;
      angular.forEach(cart.items, function(item, index){
        if(item.getId()===id){
          removedItem = cart.items.splice(index, 1)[0] || {};
        }
      });

      this.setCart(cart);
       $rootScope.$broadcast('amCart:change', {});
       $rootScope.$broadcast('amCart:remove', removedItem);
      return removedItem;
    };


    this.isEmpty=function(){
      return this.getCart().items.length >0 ? false: true;
    };


    this.toObject=function(){
      if(this.getCart().items.length <0) {return false;}

      var items=[];
      angular.forEach(this.getAllItems(), function(item){
        items.push(item.toObject());

      });

      return{
        shipping:this.getShipping(),
        subTotal: this.getSubTotal(),
        items: items
      };

    };


    this.restore=function(cart){
        var _self=this;
        _self.init();
        _self.$cart.shipping=cart.shipping;
        _self.subTotal= cart.subTotal;
        angular.forEach(cart.items, function(item){
          _self.$cart.items.push(new AmItem(item.id, item.name, item.image, item.price, item.quantity, item.data));
        });

        this.save();
    };


    this.save=function(){
      $rootScope.$broadcast('amCart:beforeSave', {});
      return store.set('amCart', JSON.stringify(this.toObject()));

    };


  }])

  .factory('AmItem', ['$log', function($log){
    var item = function(id, name, image, price, quantity, data) {
      this.setId(id);
      this.setName(name);
      this.setImage(image);
      this.setPrice(price);
      this.setQuantity(quantity);
      this.setData(data);
    };
    item.prototype.setId=function(id){
      if(id && typeof id === 'number'){
        this.id=id;
      }else{
        $log.error("A numaric Id must be provided");
      }
    };

    item.prototype.getId=function(){
      return this.id;
    };
    item.prototype.setName= function(name){
      if(name && typeof name === 'string') {
        this.name= name;
      } else {
        $log.error("A product name must be provieded");
      }
    };
    item.prototype.getName= function(){
      return this.name;
    };
    item.prototype.setImage=function(image){
      if(image) {this.image=image;}
      else {this.image='defaultimges.jpg';}
    };
    item.prototype.getImage=function(){
      return this.image;
    };
    item.prototype.setPrice=function(price){
      var pricef = parseFloat(price);
      if(pricef >=0 ){
        this.price=(pricef);
      }
      else {$log.error("A price must be provided");}
    };
    item.prototype.getPrice=function(){
      return this.price;
    };
    item.prototype.setQuantity=function(quantity, relative){
      var quantityi=parseInt(quantity, 10);
      if(quantityi && quantityi > 0)
      {
        if(relative === true){
          this.quantity +=quantityi;
        }else {
          this.quantity=quantityi;
        }
      }else {
        this.quantity=1;
        $log.info("Quantity must be an integer gratter then 0");
      }
    };
    item.prototype.getQuantity=function(){
      return this.quantity;
    };
    item.prototype.setData=function(data){
      if(data) {this.data=data;}
    };
    item.prototype.getData=function(){
      if(this.data){
          return this.data;
      }else {
        $log.info("This item has not set any data");
      }
    };
    item.prototype.getTotal=function(){
       this.total= parseFloat(this.getQuantity() * this.getPrice()).toFixed(2);

       return this.total;
    };
    item.prototype.toObject=function(){
      return {
        id : this.getId(),
        name: this.getName(),
        image:this.getImage(),
        price: this.getPrice(),
        quantity: this.getQuantity(),
        total:this.getTotal()
      };
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
    };
  }])

  .service('isMobile', ['$window', function($window){

    return {
      Android: function() {
            return $window.navigator.userAgent.match(/Android/i);
        },
        BlackBerry: function() {
            return $window.navigator.userAgent.match(/BlackBerry/i);
        },
        iOS: function() {
            return $window.navigator.userAgent.match(/iPhone|iPad|iPod/i);
        },
        Opera: function() {
            return $window.navigator.userAgent.match(/Opera Mini/i);
        },
        Windows: function() {
            return $window.navigator.userAgent.match(/IEMobile/i);
        },
        any: function() {
            return (this.Android() || this.BlackBerry() || this.iOS() || this.Opera() || this.Windows());
        }
    }
  }])


  ;
