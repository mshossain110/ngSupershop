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
    scope:{

    },
    link: function($scope, element, attrs){
      var animationDelay = attrs.amDelay;
      var animationRepeat = attrs.repeat;


        if(!element.hasClass('animated')){
          element.addClass('no-animated');
           $timeout(function(){
              element.bind('appear', function(){
                $timeout(function(){
                  element.removeClass('no-animated').addClass(attrs.amAnimate + ' animated');
                }, animationDelay);

              });

              if(animationRepeat){
                element.bind('disappear', function(){
                  $timeout(function(){
                    element.removeClass(attrs.amAnimate + ' animated').addClass('no-animated');
                  }, animationDelay);

                });
              }
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
.directive('amSocialshare', ['$location', function($location){
// ["facebook", "twitter", "linkedin", "google+", "pinterest", "tumblr", "reddit", "stumbleupon", "buffer", "digg", "delicious", "vk", "pocket", "wordpress", "flipboard", "xing", "hackernews", "evernote"]
  return {
    restrict : 'EAC',
    transclude : false,
    templateUrl : 'views/templates/socialShare.html',
    controller: function($scope, $location){
      $scope.url= $location.absUrl();
      $scope.host = location.host;

      $scope.socials = angular.isDefined($scope.socials) ? $scope.socials : ["facebook", "twitter", "linkedin", "google+"]
    },
    scope : {
      data : '=',
      socials: '=?'
    },
    link : function(scope, element, attrs){

    }
  };

}])
/*skill*/
.directive('skill', ['$timeout', function($timeout){
  return {
    restrict : 'C',
    scope :{
      width: '=',
      amDelay : '=?'
    },
    link: function(scope, element, attrs){

         element.bind('appear', function(){
             element.find('.skill-bg').css('width', scope.width + '%');
         });

           element.bind('disappear', function(){
                element.find('.skill-bg').css('width', 0);
           });

    }
  }
}])
.directive('toucharea', ['$touch', function($touch){
  // Runs during compile
  return {
    restrict: 'C',
    link: function($scope, elem) {
      $scope.touch = null;
      $touch.bind(elem, {
        start: function(touch) {
          $scope.touch = touch;
          $scope.$apply();
        },

        cancel: function(touch) {
          $scope.touch = touch;
          $scope.$apply();
        },

        move: function(touch) {
          $scope.touch = touch;
          $scope.$apply();
        },

        end: function(touch) {
          $scope.touch = touch;
          $scope.$apply();
        }
      });
    }
  };
}])

//
// `$drag` example: drag to dismiss
//
.directive('dragToDismiss', function($drag, $parse, $timeout){
  return {
    restrict: 'A',
    compile: function(elem, attrs) {
      var dismissFn = $parse(attrs.dragToDismiss);
      return function(scope, elem){
        var dismiss = false;

        $drag.bind(elem, {
          transform: $drag.TRANSLATE_RIGHT,
          move: function(drag) {
            if( drag.distanceX >= drag.rect.width / 4) {
              dismiss = true;
              elem.addClass('dismiss');
            } else {
              dismiss = false;
              elem.removeClass('dismiss');
            }
          },
          cancel: function(){
            elem.removeClass('dismiss');
          },
          end: function(drag) {
            if (dismiss) {
              elem.addClass('dismitted');
              $timeout(function() {
                scope.$apply(function() {
                  dismissFn(scope);
                });
              }, 300);
            } else {
              drag.reset();
            }
          }
        });
      };
    }
  };
})

//
// Another `$drag` usage example: this is how you could create
// a touch enabled "deck of cards" carousel. See `carousel.html` for markup.
//
.directive('carousel', function(){
  return {
    restrict: 'C',
    scope: {},
    controller: function() {
      this.itemCount = 0;
      this.activeItem = null;

      this.addItem = function(){
        var newId = this.itemCount++;
        this.activeItem = this.itemCount === 1 ? newId : this.activeItem;
        return newId;
      };

      this.next = function(){
        this.activeItem = this.activeItem || 0;
        this.activeItem = this.activeItem === this.itemCount - 1 ? 0 : this.activeItem + 1;
      };

      this.prev = function(){
        this.activeItem = this.activeItem || 0;
        this.activeItem = this.activeItem === 0 ? this.itemCount - 1 : this.activeItem - 1;
      };
    }
  };
})

.directive('carouselItem', function($drag) {
  return {
    restrict: 'C',
    require: '^carousel',
    scope: {},
    transclude: true,
    template: '<div class="item"><div ng-transclude></div></div>',
    link: function(scope, elem, attrs, carousel) {
      scope.carousel = carousel;
      var id = carousel.addItem();

      var zIndex = function(){
        var res = 0;
        if (id === carousel.activeItem){
          res = 2000;
        } else if (carousel.activeItem < id) {
          res = 2000 - (id - carousel.activeItem);
        } else {
          res = 2000 - (carousel.itemCount - 1 - carousel.activeItem + id);
        }
        return res;
      };

      scope.$watch(function(){
        return carousel.activeItem;
      }, function(){
        elem[0].style.zIndex = zIndex();
      });

      $drag.bind(elem, {
        //
        // This is an example of custom transform function
        //
        transform: function(element, transform, touch) {
          //
          // use translate both as basis for the new transform:
          //
          var t = $drag.TRANSLATE_BOTH(element, transform, touch);

          //
          // Add rotation:
          //
          var Dx    = touch.distanceX,
              t0    = touch.startTransform,
              sign  = Dx < 0 ? -1 : 1,
              angle = sign * Math.min( ( Math.abs(Dx) / 700 ) * 30 , 30 );

          t.rotateZ = angle + (Math.round(t0.rotateZ));

          return t;
        },
        move: function(drag){
          if(Math.abs(drag.distanceX) >= drag.rect.width / 4) {
            elem.addClass('dismiss');
          } else {
            elem.removeClass('dismiss');
          }
        },
        cancel: function(){
          elem.removeClass('dismiss');
        },
        end: function(drag) {
          elem.removeClass('dismiss');
          if(Math.abs(drag.distanceX) >= drag.rect.width / 4) {
            scope.$apply(function() {
              carousel.next();
            });
          }
          drag.reset();
        }
      });
    }
  };
})

.directive('dragMe', ['$drag', function($drag){
  return {
    controller: function($scope, $element) {
      $drag.bind($element,
        {
          //
          // Here you can see how to limit movement
          // to an element
          //
          transform: $drag.TRANSLATE_INSIDE($element.parent()),
          end: function(drag) {
            // go back to initial position
            drag.reset();
          }
        },
        { // release touch when movement is outside bounduaries
          sensitiveArea: $element.parent()
        }
      );
    }
  };
}])
;
