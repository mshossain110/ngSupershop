'use strict';

/**
 * @ngdoc directive
 * @name ngSuperShopApp.directive:amAddtocart
 * @description
 * # amAddtocart
 */
angular.module('ngSuperShopApp')
.directive('cardSummery', function(){
  return {
    controller: 'cardSummeryclrt',
    transclude:true,
    restrict: 'E',
    scope:{},
    templateUrl: function(element, attrs) {
        if ( typeof attrs.templateUrl == 'undefined' ) {
            return 'views/shop/cardSummery.html';
        } else {
            return attrs.templateUrl;
        }
    },

  }
})
  ;
