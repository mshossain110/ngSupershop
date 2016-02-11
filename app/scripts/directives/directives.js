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
    template: '<div class="shopping-cart-icon">'+'<a href=""><i class="fa fa-shopping-cart"></i><span>{{amCart.getTotalItems()}}</span></a></div>',
  };
})
.directive('amProducts', function(){
  return {
    controller: 'amproductclrt',
    transclude:false,
    restrict: 'C',
    link: function($scope, element, attrs){

    }
  };
})
.directive('amcarousel', [ '$timeout', 'isMobile',  function($timeout, isMobile){
  return {
    transclude : false,
    restrict : 'C',
    scope : {
      pagination : '=?',
      slidesPerView : '=?',
      slidesPerColumn : '=?',
      autoplay : '=?'
    },
    link: function(scope, element, attrs){
      console.log(scope.slidesPerView);
        scope.pagination = angular.isDefined(scope.pagination) ? scope.pagination : '.swiper-pagination';
        scope.slidesPerView = angular.isDefined(scope.slidesPerView) ? parseInt(scope.slidesPerView, 10) : 4;
        scope.slidesPerColumn = angular.isDefined(scope.slidesPerColumn) ? scope.slidesPerColumn : 1;
        scope.autoplay = angular.isDefined(scope.autoplay) ? scope.autoplay : '';
        $timeout(function(){
          var swiper = new Swiper(element , {
             pagination: scope.pagination ,
             slidesPerView: scope.slidesPerView,
             slidesPerColumn: scope.slidesPerColumn,
             paginationClickable: true,
             nextButton: '.amCarousel-button-next',
             prevButton: '.amCarousel-button-prev',
             loop: true,
             autoplay:scope.autoplay,
             spaceBetween: 30,
             breakpoints: {
                1024: {
                    slidesPerView: scope.slidesPerView,
                    spaceBetween: 20
                },
                768: {
                    slidesPerView: scope.slidesPerView - 1,
                    spaceBetween: 10
                },
                640: {
                    slidesPerView: 1,
                    spaceBetween: 20
                },
                320: {
                    slidesPerView: 1,
                    spaceBetween: 15
                }
            }
         });
        }, 500)

    }
  }
}])
.directive('amNavigation', ['$rootScope','SharedState', '$document', '$window', function($rootScope, SharedState, $document, $window){
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

          var $w = angular.element($window),
              $body = angular.element('body'),
              $header= angular.element('#header'),
              sidebar = angular.element('.sidebar'),
              magaW = angular.element('.container').width();


              var exampleOptions = {
                popUpSelector: 'ul,.mega-menu-content',
                delay: 250,
      					speed: 350,
      					animation: {opacity:'show'},
      					animationOut:  {opacity:'hide'},
      					cssArrows: false
              }

              var nav = element.find('ul.sf-menu').superfish(exampleOptions);

              var subNav=$( '#primary-menu ul li:has(ul)' ).addClass('sub-menu');

              if($scope.mobile===true){
                  element.addClass('sidebarNav');
                  magaW=sidebar.width();
                  var signIcon = subNav.prepend('<i class="navsign"></i>');
                  element.on('click', 'li', function(){
                    SharedState.turnOff('uiSidebarLeft');
                  });

              }

              $scope.$watch(function () {
                  return {
                      'w': magaW,
                  };
              }, function (newValue, oldValue) {
                  element.find('.mega-menu-content').css({ 'width': newValue.w });
              }, true);

              $w.bind('resize', function () {
                  $scope.$apply();
              });

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
    template: '<a href="" class="goToTop"><span class="fa fa-arrow-circle-up fa-2x"></span> </a>',
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
}])
.directive('amPagetitle', ['$interpolate', '$state', function($interpolate, $state) {
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

                    scope.pageTitle=getDisplayName($state.$current);

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
//
// .directive('amParallax', [ '$window', '$timeout', 'isMobile', function($window, $timeout, isMobile){
//           return {
//             transclude:false,
//             restrict: 'C',
//             scope:{},
//             link: function($scope, element, attrs){
//               var scrolable = angular.element('.scrollable-content');
//               element.css('height', 450);
//               scrolable.stellar({
//
//       				});
//
//             }
//
//           };
// }])
;
