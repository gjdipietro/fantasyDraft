(function() {
  'use strict';

  angular
    .module('app.core')
    .factory('playerService', playerService);

  playerService.$inject = ['$http'];

  function playerService($http) {
    var service = {
      getPlayerHighlights: getPlayerHighlights
    };
    return service;

    function getPlayerHighlights(query) {
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