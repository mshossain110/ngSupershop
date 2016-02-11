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
            if(filter.type !== 'priceRange'){
              if(_.indexOf(filter.option, product[filter.type]) === -1){
                include = false;
              }
            }else{
              if(!(product.price >= filter.option[0] && product.price <= filter.option[1])){
                  include = false;
              }
            }

          })

            if(include){
              filtered.push(product);
            }

        });

        return filtered;

    }
  });

})();
