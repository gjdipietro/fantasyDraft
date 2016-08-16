(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('playerService', playerService);

  playerService.$inject = ['$http'];

  function playerService($http) {
    var service = {
      getPlayers: getPlayers,
      getPlayerHighlights: getPlayerHighlights
    };
    return service;
    //http://api.fantasy.nfl.com/v1/players/advanced?season=2015&count=1&format=json&count=100
    function getPlayers(offset) {
      var url = 'http://api.fantasy.nfl.com/v1/players/editordraftranks?format=json&count=100';
      if (offset) {
        url += '&offset='+offset;
      }
      return $http({
        method: 'GET', 
        url: url,
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