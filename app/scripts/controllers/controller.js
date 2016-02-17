'use strict';

/**
 * @ngdoc function
 * @name ngSuperShopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngSuperShopApp
 */
angular.module('ngSuperShopApp')

   .controller('MainController', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http){
     $rootScope.$broadcast('bodyClass:add', $scope.bodyClass);

     function rawurlencode(str) {
    str = (str+'').toString();
    return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
                                                                                   replace(/\)/g, '%29').replace(/\*/g, '%2A');
}
   var oauth = new OAuth({
            consumer: {
                public: 'ck_da4c6fd7b9af4d5f5c34aec40a1c01b8fcff735b',
                secret: 'cs_8045d1c622bc0e1c6da273962259711ca77a9e55'
            },
            signature_method: 'HMAC-SHA1'
         });

         var request_data = {
             url: 'http://biswas-stall.com/wc-api/v1/products',
              method: 'GET',

          };
          var token = {
            public: 'ck_da4c6fd7b9af4d5f5c34aec40a1c01b8fcff735b',
            secret: 'cs_8045d1c622bc0e1c6da273962259711ca77a9e55'
          };

          var data = oauth.authorize(request_data);

          var url =rawurlencode(request_data.url) + "&" +
                      "oauth_consumer_key"+"%3D"+rawurlencode(data.oauth_consumer_key)+
                      "%26"+"oauth_nonce"+"%3D"+rawurlencode(data.oauth_nonce)+
                      "%26"+"oauth_signature_method"+"%3D"+rawurlencode(data.oauth_signature_method)+
                      "%26"+"oauth_timestamp"+"%3D"+rawurlencode(data.oauth_timestamp)+
                      "%26"+"oauth_signature"+"%3D"+rawurlencode(data.oauth_signature);
        $http.get(url).success(function(data) {

            console.log(data);
        })

   }])
   .controller('MainCtrl',['$scope',   function ($scope) {


    }])
  .controller('ShopSingleClt', ['$scope', '$stateParams', '$http','$timeout', 'PService', 'amCart', function($scope, $stateParams, $http, $timeout, PService, amCart){
    $scope.Productid=$stateParams.id;

    /*-----------Load data if not loaded-----------*/
    if(PService.isEmpty()){
          $http.get('data/products.json').success(function(response){
          PService.init(response);
        });
      }

      $timeout(function(){
          $scope.ps = PService;
          $scope.singleProduct = $scope.ps.getProductByID($stateParams.id);
      },500);

      $scope.amCart=amCart;


  }])

  .controller('amAddtocartClr', ['$scope', function($scope){

  }])


  .controller('cardSummeryclrt', ['$scope', 'amCart',  function($scope, amCart){
    $scope.amCart=amCart;
  } ])


  .controller('amproductclrt', ['$scope', '$timeout', '$http', 'PService',  'amCart', 'amFilterService',
   function($scope, $timeout, $http, PService, amCart, amFilterService){

    if(PService.isEmpty()){
          $http.get('data/products.json').success(function(response){
          PService.init(response);
        });
      }

      $timeout(function(){
          $scope.p=PService;
      },500);

    $scope.amCart=amCart;

    $scope.setProductId=function(id){
      $scope.sproduct=PService.getProductByID(id);
    };
    /* set filter function*/
    $scope.filters=amFilterService;

    /*filterbar toggle*/
    $scope.isFilterbarOpern = true;
    $scope.toggleFilterbar= function(){
        return $scope.isFilterbarOpern = !$scope.isFilterbarOpern
    }

    /*product rzslider slider scope*/
    $timeout(function(){
      $scope.priceRange = {
                minValue: $scope.p.$minPrice,
                maxValue: $scope.p.$maxPrice,
                options: {
                    floor: $scope.p.$minPrice,
                    ceil: $scope.p.$maxPrice,
                    step: 1,
                    onEnd: function(sliderId, modelValue, highValue){
                      $scope.filters.setFilter('priceRange', [modelValue, highValue])
                    }
                }
            };

    },500);

  } ]);
