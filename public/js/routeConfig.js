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
      .when('/:id/draft/', {
        templateUrl: '/partials/draft.html',
        controller: 'DraftController',
        controllerAs: 'vm'
      })
      .when('/:id/undraft/', {
        templateUrl: '/partials/undraft.html',
        controller: 'DraftController',
        controllerAs: 'vm'
      })
      .when('/:id/board/', {
        templateUrl: '/partials/board.html',
        controller: 'DraftController',
        controllerAs: 'vm'
      })
      .otherwise({
        redirectTo: '/'
      });
    $locationProvider.html5Mode(true);
  }
})();



