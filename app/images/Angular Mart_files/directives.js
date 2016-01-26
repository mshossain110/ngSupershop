'use strict';

/**
 * @ngdoc directive
 * @name ngSuperShopApp.directive:amAddtocart
 * @description
 * # amAddtocart
 */
angular.module('ngSuperShopApp')
.directive('cartSummery', function(){
  return {
    controller: 'cardSummeryclrt',
    transclude:true,
    restrict: 'E',
    templateUrl: function(element, attrs) {
        if ( typeof attrs.templateUrl === 'undefined' ) {
            return 'views/shop/cardSummery.html';
        } else {
            return attrs.templateUrl;
        }
    }
  };
})
.directive('cartIcon', function(){
  return {
    controller: 'cardSummeryclrt',
    transclude:true,
    restrict: 'E',
    scope:{
    },
    template: '<div class="shopping-cart-icon">'+'<span class="fa fa-shopping-cart">{{amCart.getTotalItems()}}</span>'+'<div class="items-inner">'+'<strong>Shopping Cart</strong>'+'<span class="cart-amount">{{amCart.getTotalItems()}} item(s) {{amCart.getSubTotal()| currency}}</span>'+'</div></div>',
  };
})
.directive('amProducts', function(){
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
        if($scope.mobile===true){
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
/*directive for animation*/

.directive('amAnimate', [ '$timeout', function($timeout){
  return {
    transclude:false,
    restrict: 'A',
    scope:{},
    link: function($scope, element, attrs){
      var animationDelay = attrs.amDelay;


        if(!element.hasClass('animated')){
          element.addClass('no-animated');
           $timeout(function(){
              element.bind('appear', function(){
                $timeout(function(){
                  element.removeClass('no-animated').addClass(attrs.amAnimate + ' animated');
                }, animationDelay);

              });
          }, 100);

        }
    }

  };
}])
/*gototop*/
.directive('amGototop', [ '$timeout', 'isMobile', function($timeout, isMobile){
  return {
    transclude:false,
    restrict: 'E',
    template: '<a href="#body" class="goToTop"><span class="fa fa-arrow-circle-up fa-2x"></span> </a>',
    scope:{},
    link: function($scope, element, attrs){
      if(!isMobile.any()){
           jQuery('.scrollable-content').on('scroll', function() {
              if(jQuery(this).scrollTop() > 500){
                element.fadeIn(100);
              }else{
                element.fadeOut(100);
              }
          });
      }


        element.on('click', function(){
          jQuery('.scrollable-content').animate({scrollTop:0},1000);
        });
    }

  };
}]).directive('amBreadcrumbs', ['$interpolate', '$state', function($interpolate, $state) {
            return {
                restrict: 'E',
                templateUrl: function(elem, attrs) {
                    return attrs.templateUrl || 'views/templates/breadcrumbs.html';
                },
                scope: {
                    displaynameProperty: '@',
                    abstractProxyProperty: '@?'
                },
                link: function(scope) {
                    scope.breadcrumbs = [];
                    if ($state.$current.name !== '') {
                        updateBreadcrumbsArray();
                    }
                    scope.$on('$stateChangeSuccess', function() {
                        updateBreadcrumbsArray();
                    });


                    function updateBreadcrumbsArray() {
                        var workingState;
                        var displayName;
                        var breadcrumbs = [];
                        var currentState = $state.$current;

                        while(currentState && currentState.name !== '') {
                            workingState = getWorkingState(currentState);
                            if (workingState) {
                                displayName = getDisplayName(workingState);

                                if (displayName !== false && !stateAlreadyInBreadcrumbs(workingState, breadcrumbs)) {
                                    breadcrumbs.push({
                                        displayName: displayName,
                                        route: workingState.name
                                    });
                                }
                            }
                            currentState = currentState.parent;
                        }
                        breadcrumbs.reverse();
                        scope.breadcrumbs = breadcrumbs;
                    }


                    function getWorkingState(currentState) {
                        var proxyStateName;
                        var workingState = currentState;
                        if (currentState.abstract === true) {
                            if (typeof scope.abstractProxyProperty !== 'undefined') {
                                proxyStateName = getObjectValue(scope.abstractProxyProperty, currentState);
                                if (proxyStateName) {
                                    workingState = angular.copy($state.get(proxyStateName));
                                    if (workingState) {
                                        workingState.locals = currentState.locals;
                                    }
                                } else {
                                    workingState = false;
                                }
                            } else {
                                workingState = false;
                            }
                        }
                        return workingState;
                    }


                    function getDisplayName(currentState) {
                        var interpolationContext;
                        var propertyReference;
                        var displayName;

                        if (!scope.displaynameProperty) {
                            // if the displayname-property attribute was not specified, default to the state's name
                            return currentState.name;
                        }
                        propertyReference = getObjectValue(scope.displaynameProperty, currentState);

                        if (propertyReference === false) {
                            return false;
                        } else if (typeof propertyReference === 'undefined') {
                            return currentState.name;
                        } else {
                            // use the $interpolate service to handle any bindings in the propertyReference string.
                            interpolationContext =  (typeof currentState.locals !== 'undefined') ? currentState.locals.globals : currentState;
                            displayName = $interpolate(propertyReference)(interpolationContext);
                            return displayName;
                        }
                    }


                    function getObjectValue(objectPath, context) {
                        var i;
                        var propertyArray = objectPath.split('.');
                        var propertyReference = context;

                        for (i = 0; i < propertyArray.length; i ++) {
                            if (angular.isDefined(propertyReference[propertyArray[i]])) {
                                propertyReference = propertyReference[propertyArray[i]];
                            } else {
                                // if the specified property was not found, default to the state's name
                                return undefined;
                            }
                        }
                        return propertyReference;
                    }


                    function stateAlreadyInBreadcrumbs(state, breadcrumbs) {
                        var i;
                        var alreadyUsed = false;
                        for(i = 0; i < breadcrumbs.length; i++) {
                            if (breadcrumbs[i].route === state.name) {
                                alreadyUsed = true;
                            }
                        }
                        return alreadyUsed;
                    }
                }
            };
        }])
  ;
