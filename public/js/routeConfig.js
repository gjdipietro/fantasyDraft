// route-config.js
(function() {
  'use strict';
  angular
    .module('app')
    .config(config);

  function config($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/partials/createLeague.html',
        controller: 'LeagueController',
        controllerAs: 'vm'
      })
      .when('/league/:id', {
        templateUrl: '/partials/draft.html',
        controller: 'DraftController',
        controllerAs: 'vm',
      })
      .when('/league/:id/recap', {
        templateUrl: '/partials/recap.html',
        controller: 'DraftController',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
    
    $locationProvider.html5Mode(true);
  }
})();


