(function(){
  'use strict'
  angular.module('angularDemo', ['ngMaterial']); //initialize module

  //can reference model instead of creating a global variable
  angular.module('angularDemo').controller('angularController',
                                           ['$scope','ProductDataService', function($scope, ProductDataService) {
    var products = ProductDataService.getSampleData();
    $scope.Fruits = products; //use $scope to expose to the view

    //create checkbox filters on the fly with dynamic data
    var filters = [];
    _.each(products, function(product) {
      _.each(product.properties, function(property) {
        var existingFilter = _.findWhere(filters, { name: property.name });

        if (existingFilter) {
          var existingOption = _.findWhere(existingFilter.options, { value: property.value });
          if (existingOption) {
            existingOption.count += 1;
          } else {
            existingFilter.options.push({ value: property.value, count: 1 });
          }
        } else {
          var filter = {};
          filter.name = property.name;
          filter.options = [];
          filter.options.push({ value: property.value, count: 1 });
          filters.push(filter);
        }
      });
    });
    $scope.Filters = filters;

    this.toggleAll = function($event, includeAll) {
      _.each(filters, function(filterCategory) {
        _.each(filterCategory.options, function(option) {
          option.IsIncluded = includeAll;
        });
      });
    };
  }]);

  angular.module('angularDemo').filter('dynamicFilter', function () {
    return function (products, filterCategories, scope) {
      var filtered = [];

      var productFilters = _.filter(filterCategories, function(fc) {
        return  _.any(fc.options, { 'IsIncluded': true });
      });

      _.each(products, function(prod) {
        var includeProduct = true;
        _.each(productFilters, function(filter) {
          var props = _.filter(prod.properties, { 'name': filter.name });
          if (!_.any(props, function(prop) { return _.any(filter.options, { 'value': prop.value, 'IsIncluded': true }); })) {
            includeProduct = false;
          }
        });
        if (includeProduct) {
          filtered.push(prod);
        }
      });
      return filtered;
    };
  });

  angular.module('angularDemo').service('ProductDataService', function() {
    var service = {};

    //sample data
    var products = [
      {
        name: 'apple',
        properties: [
          { name:'type', value:'fruit' }, { name:'color', value:'red' },
          { name:'size', value:'medium' }, { name:'shape', value:'weird' }
        ]
      },{
        name: 'orange',
        properties: [
          { name:'type', value:'fruit' }, { name:'color', value:'orange'},
          { name:'size', value:'medium' }, { name:'shape', value:'sphere'}
        ]
      },{
        name: 'grapefruit',
        properties: [
          { name:'type', value:'fruit' }, { name:'color', value:'yellow' },
          { name:'size', value:'large' }, { name:'shape', value:'sphere' }
        ]
      },{
        name: 'lemon',
        properties: [
          { name:'type', value:'fruit' }, { name:'color', value:'yellow' },
          { name:'size', value:'small' }, { name:'shape', value:'lemon' }
        ]
      },{
        name: 'lime',
        properties: [
          { name:'type', value:'fruit' }, { name: 'color', value: 'green' },
          { name:'size', value:'small' }, { name: 'shape', value: 'lemon' }
        ]
      },{
        name:'pepper',
        properties: [
          { name:'type', value:'vegetable' }, { name:'color', value:'red' },
          { name:'size', value:'medium' }, { name:'shape', value:'weird' }
        ]
      }
    ];

    service.getSampleData = function() {
      return products;
    };

    return service;
  });

})();
