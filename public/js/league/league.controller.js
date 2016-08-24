(function() {
'use strict';

function LeagueController(firebaseDataService, $window) {
  var vm = this;

  vm.createLeague = createLeague;
  vm.enterLeague = enterLeague;

  function createLeague(league) {
    var newLeague = {
      'name': league.name
    };
    var leagueID = firebaseDataService.addLeague(newLeague);
    _redirectToLeague(leagueID);
  }

  ///////////////////////////////////////////
  // PRIVATE FUNCTIONS
  ///////////////////////////////////////////
  function _redirectToLeague(id) {
    $window.location.href = '/league/' + id;
  }
}

angular
  .module('app.league')
  .controller('LeagueController', LeagueController);

LeagueController.$inject = ['firebaseDataService', '$window'];

})();
