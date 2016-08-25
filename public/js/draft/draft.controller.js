(function() {
  'use strict';

  function DraftController ($scope, $q, firebaseDataService, $routeParams, playerService, $firebaseArray, $firebaseObject) {
    var vm = this;
    vm.players = [];
    vm.takenPlayers = [];
    vm.league = {};
    vm.search = {
      'position': '',
      'positionDisplay': 'All Players'
    };
    //Interface
    vm.draftPlayer = draftPlayer;
    vm.clearSearch = clearSearch;
    //activate
    _activate();

    function _activate() {
      vm.players = getPlayers();
      vm.league = getLeagueInfo($routeParams.id);
    }
    function getPlayers() {
      vm.players = firebaseDataService.getPlayers();
      return vm.players;
    }
    function getLeagueInfo(leagueId) {
      vm.league = firebaseDataService.getLeagueInfo(leagueId);
      return vm.league;
    }
    function draftPlayer(player) {
      firebaseDataService.draftPlayer(player);
    }
    //searching
    function clearSearch () {
      vm.search.$ = '';
    }
    $scope.$watch('vm.search.position', function(value) {
      switch (value) {
        case '':
          vm.search.positionDisplay = 'All Players';
          break;
        case 'qb':
          vm.search.positionDisplay = 'Quarterbacks';
          break;
        case 'wr':
          vm.search.positionDisplay = 'Wide Recievers';
          break;
        case 'rb':
          vm.search.positionDisplay = 'Running Backs';
          break;
        case 'te':
          vm.search.positionDisplay = 'Tight Ends';
          break;
        case 'def':
          vm.search.positionDisplay = 'Defense';
          break;
        case 'k':
          vm.search.positionDisplay = 'Kickers';
          break;
      }
    });

    ////////////////////////////////////////
    function getPlayerHighlights() {
      return playerService
        .getPlayerHighlights()
        .then(getYoutubeCode)
        .catch(getYoutubeCodeFailed);

      function getYoutubeCode(resp) {
        vm.youtubeCode = resp.data.items[0].id.videoId;
        return vm.youtubeCode;
      }
      function getYoutubeCodeFailed(e) {
        return $q.reject(e);
      }
    }
  }

  angular
    .module('app.draft')
    .controller('DraftController', DraftController);

  DraftController.$inject = [
    '$scope',
    '$q',
    'firebaseDataService',
    '$routeParams',
    '$firebaseArray',
    '$firebaseObject'];

})();