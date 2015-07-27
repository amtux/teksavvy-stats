'use strict';

describe('Controller: DailyCtrl', function () {

  // load the controller's module
  beforeEach(module('teksavvyStatsApp'));

  var DailyCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    DailyCtrl = $controller('DailyCtrl', {
      $scope: scope
      // place here mocked dependencies
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(DailyCtrl.awesomeThings.length).toBe(3);
  });
});
