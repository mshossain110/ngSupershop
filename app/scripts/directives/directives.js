'use strict';

/**
 * @ngdoc directive
 * @name ngSuperShopApp.directive:amAddtocart
 * @description
 * # amAddtocart
 */
angular.module('ngSuperShopApp')
  .directive('amAddtocart', function () {
    return {
      controller: 'amAddtocartClr',
      scope: {
        id : '@',
        name: '@',
        price: '@',
        quantity: '@'
      },
      transclude: true,
      restrict: 'E',
      templateUrl: '../../views/templates/addtocart.html',

      link: function postLink(scope, element, attrs) {
        
      }
    };
  });
