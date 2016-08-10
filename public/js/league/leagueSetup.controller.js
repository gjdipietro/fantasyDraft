(function() {
'use strict';

angular
  .module('app.league')
  .controller('LeagueSetupController', LeagueSetupController);

  LeagueSetupController.$inject = ['firebaseDataService', '$routeParams'];

  function LeagueSetupController(firebaseDataService, $routeParams) {
    var vm = this;   
    var cookie = {
      "showAddTeamForm": true
    };

    vm.showAddTeamForm = _showCanAddTeamForm();
    vm.leagueID = $routeParams.id;
    vm.addTeamToLeague = addTeamToLeague;
    vm.startDraft = startDraft;


    function startDraft(team, league) {
      //get the teams in that league

      // sort them

      // display them 

      // go to the draft page with that ordered array and league id
    }

    function addTeamToLeague(team, league) {
    }

    ///////////////////////////////////////////
    // PRIVATE FUNCTIONS
    ///////////////////////////////////////////

    function _showCanAddTeamForm() {
      if(cookie.showAddTeamForm === true || cookie.showAddTeamForm === undefined){
        return true
      }
      else return false;
    }

  }

})();


