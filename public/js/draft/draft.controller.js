(function() {
  'use strict';

  function DraftController ($scope, $timeout, $q, firebaseDataService, $routeParams, playerService) {
    var vm = this;
    vm.players = [];
    vm.league = {};
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
      getLeagueInfo($routeParams.id);
    }
    function getPlayers() {
      vm.players = firebaseDataService.getPlayers();
      return vm.players;
    }
    function getLeagueInfo(leagueId) {
      vm.league = firebaseDataService.getLeagueInfo(leagueId);
      return vm.league;
    }
    function draftPlayer(player, draft) {
      firebaseDataService.draftPlayer(player, draft);
    }
    //searching
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










    //Wait
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
    '$timeout',
    '$q',
    'firebaseDataService',
    '$routeParams'
  ];
})();
