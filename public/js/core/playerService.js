(function() {
  'use strict';

  angular
    .module('app')
    .factory('playerService', playerService);

  playerService.$inject = ['$http'];

  function playerService($http) {
    var service = {
      getPlayers: getPlayers
    };
    return service;

    function getPlayers() {
      return $http({
        method: 'GET', 
        url: 'http://api.fantasy.nfl.com/v1/players/editordraftranks?format=json',
        cache: true
      })
      .success(function(data, status, headers, config) {
        return data;
      })
      .error(function(data, status, headers, config) {
      });    
    }
  }

})();