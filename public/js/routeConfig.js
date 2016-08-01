// route-config.js
(function() {
  'use strict';
  angular
    .module('app')
    .config(config);

  function config($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/partials/draftList.html',
        controller: 'DraftController',
        controllerAs: 'vm'
      })
      .when('/recap', {
        templateUrl: '/partials/recap.html',
        controller: 'DraftController',
        controllerAs: 'vm'
      });
    $locationProvider
      .html5Mode(true);
  }
})();