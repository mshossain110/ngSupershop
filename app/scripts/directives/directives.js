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
}).directive('amProducts', function(){
  return {
    controller: 'amproductclrt',
    transclude:true,
    restrict: 'E',
    scope:{},
    templateUrl: function(element, attrs) {
        if ( typeof attrs.templateUrl == 'undefined' ) {
            return 'views/shop/products.html';
        } else {
            return attrs.templateUrl;
        }
    },

  }
}).directive('slider', function(){
  return {
    transclude:true,
    restrict: 'E',
    scope:{
      data:'='
    },
    controller: function($scope){


      $scope.data.after= function (slider){
        var inner= $(slider).find(".flex-active-slide").find('.caption-inner');
        setTimeout(function(){ inner.children('h1').addClass("animated zoomIn").animate({ opacity: 1 },400); }, 300);
        setTimeout(function(){ inner.children('strong').addClass("animated fadeInUp").animate({ opacity: 1 },400); }, 600);
        setTimeout(function(){ inner.children('.btn').addClass("animated flipInX").animate({ opacity: 1 },400); }, 1000);

      };
    },
    templateUrl: function(element, attrs) {
        if ( typeof attrs.templateUrl == 'undefined' ) {
            return 'views/slider/frontPage-classic.html';
        } else {
            return attrs.templateUrl;
        }
    },
    link: function(scope, element, attrs ){
      element.find('.flexslider').flexslider(scope.data);

      var $sliderAfter=function (slider){
        var inner= $(slider).find(".flex-active-slide").find('.caption-inner');
        setTimeout(function(){ inner.children('h1').addClass("animated zoomIn").animate({ opacity: 1 },400); }, 300);
        setTimeout(function(){ inner.children('strong').addClass("animated fadeInUp").animate({ opacity: 1 },400); }, 600);
        setTimeout(function(){ inner.children('.btn').addClass("animated flipInX").animate({ opacity: 1 },400); }, 1000);

      };

      var $sliderBefore=function (slider){
        $(slider).find(".flex-active-slide").find('.caption-inner').each(function(){
         $(this).children('h1, strong, .btn').removeClass("animated zoomIn fadeInUp flipInX").animate({opacity:0}, 400);
         });
      };

      var $sliderStart=function (slider){
        $(slider).find('.caption-inner').each(function(){
          $(this).children('h1, strong, .btn').css('opacity', 0)
            var inner= $(slider).find(".flex-active-slide").find('.caption-inner');
         setTimeout(function(){ inner.children('h1').addClass("animated zoomIn").animate({ opacity: 1 },400); }, 300);
         setTimeout(function(){ inner.children('strong').addClass("animated fadeInUp").animate({ opacity: 1 },400); }, 600);
         setTimeout(function(){inner.children('.btn').addClass("animated flipInX").animate({ opacity: 1 },400); }, 1000);

         });
      };
    }


  }
})
  ;
