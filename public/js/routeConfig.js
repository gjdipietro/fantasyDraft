// route-config.js
(function() {
  'use strict';
  angular
    .module('app')
    .config(config);

  function config($routeProvider, $locationProvider) {
    $routeProvider
      .when('/', {
        templateUrl: '/partials/createEnterLeague.html',
        controller: 'LeagueController',
        controllerAs: 'vm'
      })
      .when('/league/:id', {
        templateUrl: '/partials/setupLeague.html',
        controller: 'LeagueSetupController',
        controllerAs: 'vm',
      })
      .when('/draft/:id/', {
        templateUrl: '/partials/draft.html',
        controller: 'DraftController',
        controllerAs: 'vm'
      })
      .when('/draft/:id/recap', {
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


