;(function(){
  'use strict';

  angular.module('angularMart.Filter', [])

  .filter('pfilter', function(){

    return function(products, filters){

      if(undefined== filters) return products;
        var filtered =[];


        _.forEach(products, function(product){
          var include=true;
          _.forEach(filters, function(filter){
            if(filter.type !== 'pricerange'){
                var v= product[filter.type] ;


                if(_.isArray(v) ){
                  if(_.intersection( filter.option, _.toLower(v).split(',')).length > 0){
                    console.log("ok");
                    include = false;
                  }
                }else{
                  if(!_.isEmpty(filter.option)  && _.indexOf(filter.option, _.lowerCase(v)) === -1){
                    include = false;
                  }
                }
            }else{
              if(!(product.price >= filter.option[0] && product.price <= filter.option[1])){
                  include = false;
              }
            }

          });

            if(include){
              filtered.push(product);
            }

        });

        return filtered;

    }
  })
  // + -> ''
  .filter('rsing', function(){

      return function(input, rstr, withstr){
        return input.replace(rstr, withstr);
      }

  })
  // userName -> User Name
  .filter('lablecase', function(){
    return function(input){
      input = input.replace(/([A-Z])/g, ' $1');
      return input[0].toUpperCase() + input.slice(1);
    }
  });

})();
