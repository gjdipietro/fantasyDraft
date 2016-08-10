(function() {
'use strict';

angular
  .module('app.league')
  .controller('LeagueController', LeagueController);

  LeagueController.$inject = ['firebaseDataService', '$window'];

  function LeagueController(firebaseDataService, $window) {
    var vm = this;   

    vm.createLeague = createLeague;
    vm.enterLeague = enterLeague;
    
    function createLeague(league) {
      var newLeague = {
        "name": league.name
      };
      var leagueID = firebaseDataService.addLeague(newLeague);
      _redirectToLeague(leagueID);
    }

    function enterLeague(id) {
      _redirectToLeague(id);
    }


    ///////////////////////////////////////////
    // PRIVATE FUNCTIONS
    ///////////////////////////////////////////
    function _redirectToLeague(id) {
      $window.location.href = '/league/' + id;
    }
  }

})();


