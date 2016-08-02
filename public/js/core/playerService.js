(function() {
  'use strict';

  angular
    .module('app')
    .factory('playerService', playerService);

  playerService.$inject = ['$http'];

  function playerService($http) {
    var service = {
      getPlayers: getPlayers,
      getPlayerHighlights: getPlayerHighlights
    };
    return service;

    function getPlayers() {
      return $http({
        method: 'GET', 
        url: 'http://api.fantasy.nfl.com/v1/players/editordraftranks?format=json',
        cache: true
      })
      .success(function(resp, status, headers, config) {
        return resp;
      })
      .error(function(resp, status, headers, config) {
      });    
    }

    function getPlayerHighlights(query) {
      query = "antonio brown 2015 highlights";
      var key = 'AIzaSyAkL9b0eJwOTZE_-A8Q9HfgwzbFx9-4rjo';
      return $http({
        method: 'GET', 
        url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&videoSyndicated=true&type=video&videoEmbeddable=true&order=relevance&maxResults=2&q='+query+'&key='+key,
        cache: true
      })
      .success(function(resp, status, headers, config) {
        return resp.data;
      })
      .error(function(data, status, headers, config) {
      }); 
    }
  }

})();