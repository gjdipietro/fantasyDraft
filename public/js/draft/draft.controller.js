(function() {
  'use strict';

  function DraftController ($scope, $timeout, $q, firebaseDataService, playerService, $routeParams) {
    var vm = this;
    var leagueId = $routeParams.id;
    var turn = 0;
    vm.players = [];
    vm.youtubeCode = '';
    vm.league = {};
    vm.teams = [];
    vm.positionDisplay = 'All Players';
    vm.search = {
      'position': ''
    };
    //Interface
    vm.draftPlayer = draftPlayer;
    vm.clearSearch = clearSearch;

    _activate();

    /*============================
    logic
    =============================*/
    function _activate() {
      getPlayers();
      getLeagueInfo(leagueId);
      getTeams(leagueId);
    }
    function getPlayers() {
      vm.players = firebaseDataService.getPlayers();
      return vm.players;
    }
    function getLeagueInfo(leagueId) {
      vm.league = firebaseDataService.getLeagueInfo(leagueId);
      return vm.league;
    }
    function getTeams(leagueId) {
      vm.teams = firebaseDataService.getTeams(leagueId);
      return vm.teams;
    }
    function draftPlayer(player, isDraft) {
      var turn = {'turn' : _incrementDraft(vm.league.turn, vm.teams.length, isDraft)}
      firebaseDataService.updateLeague(turn, leagueId);
      firebaseDataService.draftPlayer(player, isDraft);
      getPlayerHighlights(player);
    }
    //Get youtube video
    function getPlayerHighlights(player) {
      var query = player.firstName + ' '  + player.lastName + ' highlights';
      return playerService
        .getPlayerHighlights(query)
        .then(attachYoutubeCode)
        .catch(getYoutubeCodeFailed);
      function attachYoutubeCode(resp) {
        var ytCode = {'youtubeCode': resp.data.items[0].id.videoId}
        firebaseDataService.updateLeague(ytCode, leagueId);
        return resp.data.items[0].id.videoId;
      }
      function getYoutubeCodeFailed(e) {
        return $q.reject(e);
      }
    }

    //searching and filtering
    function clearSearch (clearAll, e) {
      e.preventDefault();
      vm.search.$ = '';
      if (clearAll) {
        vm.search.position = '';
      }
    }
    $scope.$watch('vm.search.position', function(value) {
      switch (value) {
        case '':
          vm.positionDisplay = 'All Players';
          break;
        case 'qb':
          vm.positionDisplay = 'Quarterbacks';
          break;
        case 'wr':
          vm.positionDisplay = 'Wide Recievers';
          break;
        case 'rb':
          vm.positionDisplay = 'Running Backs';
          break;
        case 'te':
          vm.positionDisplay = 'Tight Ends';
          break;
        case 'def':
          vm.positionDisplay = 'Defense';
          break;
        case 'k':
          vm.positionDisplay = 'Kickers';
          break;
      }
    });


    function _incrementDraft(turn, numOfTeams, isDraft) {
      if (isDraft) {
        if (turn+1 === numOfTeams)
          return 0;
        else 
          return ++turn;
      }
      else {
        return --turn;
      }
      
    }
  }

  angular
    .module('app.draft')
    .controller('DraftController', DraftController);

  DraftController.$inject = [
    '$scope',
    '$timeout',
    '$q',
    'firebaseDataService',
    'playerService',
    '$routeParams'
  ];
})();
