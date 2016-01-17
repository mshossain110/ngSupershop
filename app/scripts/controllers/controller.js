'use strict';

/**
 * @ngdoc function
 * @name ngSuperShopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngSuperShopApp
 */
angular.module('ngSuperShopApp')
  .controller('MainCtrl',['$scope',   function ($scope) {





   }])
   .controller('MainController', ['$scope', '$rootScope', function($scope, $rootScope){
     $scope.bodyClass= '';
     $scope.bodyClass += navigator.platform? navigator.platform.split(" ")[0]+' ':'';
     $scope.bodyClass += navigator.vendor?  navigator.vendor.substr(0,4)+' ':'';
     $scope.bodyClass += window.opera ?  window.opera.substr(0,4)+' ': '';
     $scope.bodyClass += navigator.appCodeName ? navigator.appCodeName+' ': '';
      $scope.bodyClass += window.screen.width <=770 ? 'small-view'+' ': 'large-view'+' ';
     $rootScope.$broadcast('bodyClass:add', $scope.bodyClass);



   }])
  .controller('ShopSingleClt', ['$scope', '$routeParams', '$http','PService',function($scope, $routeParams, $http, PService){
    var Productid=$routeParams.productID;



      if(!PService.isEmpty()){
        $scope.product=PService.getProductByID(Productid);
      }else{
          $http.get('data/products.json').success(function(response){
          PService.setAllProducts(response);
          $scope.product=PService.getProductByID(Productid);
        });
      }


  }])

  .controller('amAddtocartClr', ['$scope', function($scope){

  }])


  .controller('cardSummeryclrt', ['$scope', 'amCart',  function($scope, amCart){
    $scope.amCart=amCart;
  } ])


  .controller('amproductclrt', ['$scope', '$http', 'PService',  'amCart', function($scope,$http, PService, amCart){

    if(!PService.isEmpty()){
      $scope.p=PService;
      }else{
          $http.get('data/products.json').success(function(response){
          PService.setAllProducts(response);
          $scope.p=PService;
        });
      }
    $scope.amCart=amCart;
    $scope.query='';
    $scope.setProductId=function(id){
      $scope.sproduct=PService.getProductByID(id);
    };
  } ]);
