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
        if ( typeof attrs.templateUrl === 'undefined' ) {
            return 'views/shop/cardSummery.html';
        } else {
            return attrs.templateUrl;
        }
    },

  };
}).directive('amProducts', function(){
  return {
    controller: 'amproductclrt',
    transclude:true,
    restrict: 'E',
    scope:{},
    templateUrl: function(element, attrs) {
        if ( typeof attrs.templateUrl === 'undefined' ) {
            return 'views/shop/products.html';
        } else {
            return attrs.templateUrl;
        }
    },

  };
})

.directive('amNavigation', ['$rootScope','SharedState', function($rootScope, SharedState){
    return {
      controller: function(){

      },
      transclude: true,
      restrict:'EA',
      scope:{
        mobile: '='
      },
      templateUrl: function(element, attrs){
        if(typeof attrs.templateUrl === 'undefined'){
          return 'views/templates/navigation.html';
        }else{
          return attrs.templateUrl;
        }
      },
      link: function($scope, element, attrs){
        var $nav= element.find('nav.main_menu'),
        $dropdown=$nav.find('.dropdown'),
        $animation= 400;
        $dropdown.children('a').append('<span class="fa fa-plus dsign"></span>');
        if($scope.mobile==true){
          $nav.addClass('mobile-nav');
          $nav.find('li').children('a').addClass('list-group-item');
          $nav.find('.divider, .dropdown-header').remove();

          element.on('click', 'li', function(event) {

            if($(this).hasClass('dropdown')){
                event.preventDefault();
                if(!$(this).hasClass('open')){
                  $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true,true).slideDown($animation);
                  $(this).find('.dsign').removeClass('fa-plus').addClass('fa-minus');
                }else {
                    $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true,true).slideUp($animation);
                    $(this).find('.dsign').removeClass('fa-minus').addClass('fa-plus');
                }
              $(this).toggleClass('open');
            }else{
              SharedState.turnOff('uiSidebarLeft');
            }

          });

        }else{
          element.on('mouseenter', '.dropdown', function() {

              $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true,true).slideDown($animation);
              $(this).toggleClass('open');
              $(this).find('.dsign').removeClass('fa-plus').addClass('fa-minus');
          });

          element.on('mouseleave', '.dropdown',  function() {
              $('.dropdown-menu', this).not('.in .dropdown-menu').stop(true,true).slideUp($animation);
              $(this).toggleClass('open');
              $(this).find('.dsign').removeClass('fa-minus').addClass('fa-plus');
          });
        }


      }
    };

}])
  ;
