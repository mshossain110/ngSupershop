'use strict';

describe('Directive: amAddtocart', function () {

  // load the directive's module
  beforeEach(module('ngSuperShopApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<am-addtocart></am-addtocart>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the amAddtocart directive');
  }));
});
