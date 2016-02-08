'use strict';

/**
 * @ngdoc function
 * @name ngSuperShopApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the ngSuperShopApp
 */
angular.module('ngSuperShopApp')

   .controller('MainController', ['$scope', '$rootScope', function($scope, $rootScope){
     $rootScope.$broadcast('bodyClass:add', $scope.bodyClass);

   }])
   .controller('MainCtrl',['$scope',   function ($scope) {


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


  .controller('amproductclrt', ['$scope', '$http', '$sce', 'PService',  'amCart', function($scope,$http, $sce, PService, amCart){

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
    $scope.HTMLDescription=function(html){
        return $sce.trustAsHtml(html);
    }

  } ]);
