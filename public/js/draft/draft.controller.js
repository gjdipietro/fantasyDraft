(function() {
  'use strict';

  function DraftController ($q, firebaseDataService, $routeParams, playerService, $firebaseArray, $firebaseObject) {
    var vm = this;
    vm.players = [];
    vm.takenPlayers = [];
    vm.league = {};
    vm.search = {
      'position': ''
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
    function clearSearch () {
      vm.search.$ = '';
    }

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
    '$q',
    'firebaseDataService',
    '$routeParams',
    '$firebaseArray',
    '$firebaseObject'];

})();