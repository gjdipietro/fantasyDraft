(function() {
  'use strict';

  function DraftController ($scope, $timeout, $q, firebaseDataService, playerService, $routeParams) {
    var vm = this;
    var leagueId = $routeParams.id;
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
      var turn = {'turn' : _updateTurn(vm.league.turn, vm.teams.length, isDraft)}
      firebaseDataService.updateLeague(turn, leagueId);
      firebaseDataService.draftPlayer(player, isDraft);
      getPlayerHighlights(player);
    }
    
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

    var draftDirection = 1;
    function _updateTurn(turn, numOfTeams, isDraft) {
      var totalTeams = numOfTeams-1;
      if(isDraft){
        if (draftDirection === 1) {
          if (turn === totalTeams) {
            draftDirection = -1;
          }
          turn++;
          if (turn > totalTeams) turn = numOfTeams - 1;
        }
        else if (draftDirection === -1) {
          if (turn === 0) {
            draftDirection = 1;
          }
          turn--;
          if (turn < 0) turn = 0;
        }
        return turn;
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
