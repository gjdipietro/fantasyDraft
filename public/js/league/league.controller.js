(function() {
'use strict';

angular
  .module('app.league')
  .controller('LeagueController', LeagueController);

  LeagueController.$inject = ['firebaseDataService', 'playerService', '$window'];

  function LeagueController(firebaseDataService, playerService, $window) {
    var vm = this;    
    var newLeague = {
      players: getPlayers(),
      teams: [],
      chat: []
    };

    vm.createLeague = createLeague;
    vm.enterLeague = enterLeague;

    function createLeague(league) {
      newLeague.name = league.name;
      firebaseDataService.root.push(newLeague);
      redirectToLeague("-KORZaEGmp72YeGrS8-k");
    }
    
    function getPlayers() {
      return playerService
        .getPlayers()
        .then(assignPlayers);

      function assignPlayers(resp) {
        newLeague.players = resp.data.players;
        return newLeague.players;
      }
    }

    function enterLeague(id) {
      redirectToLeague(id);
    }

    function redirectToLeague(id) {
      $window.location.href = '/league/' + id;
    }
  }

})();


