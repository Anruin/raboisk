define(["angular", "underscore"], function(angular, _) {
   return function ($rootScope) {
      console.log('run');
      //load animation
      var page = angular.element(document);
      page.find("#mainContent").removeClass("hide");
      page.find(".middle").addClass("hide");
  }
});
