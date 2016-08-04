(function() {
'use strict';

angular
  .module('app.league')
  .controller('LeagueController', LeagueController);

  LeagueController.$inject = ['firebaseDataService'];

  function LeagueController(firebaseDataService) {
    var vm = this;
    
    vm.league = {
      'name': 'FFP',
      'teams': ['abc', 'bbb', 'asdasdf']
    };
    vm.createLeague = createLeague;

    function createLeague(league) {
      var newLeague = {
        name: league.name,
        teams : league.teams
      };
      firebaseDataService.root.push(newLeague);
    }
  }

})();


