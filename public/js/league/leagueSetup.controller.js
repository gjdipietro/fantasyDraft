(function() {
'use strict';

angular
  .module('app.league')
  .controller('LeagueSetupController', LeagueSetupController);

  LeagueSetupController.$inject = ['$q', 'firebaseDataService', '$routeParams', '$cookies', '$timeout'];

  function LeagueSetupController($q, firebaseDataService, $routeParams, $cookies, $timeout) {
    var vm = this;   

    vm.teams = [];
    vm.leagueID = $routeParams.id;
    vm.showAddTeamForm = _showCanAddTeamForm(vm.leagueID);
    vm.addTeamToLeague = addTeamToLeague;
    vm.startDraft = startDraft;

    _activate();

    function addTeamToLeague(team, leagueID) {
      var newTeam = {
        "name": team.name,
        "players": {
          "QB": [],
          "RB": [],
          "WR": [],
          "TE": [],
          "DEF": [],
          "K": []
        }
      };

      var myTeamID = firebaseDataService.addTeamToLeague(newTeam, leagueID);

      //set cookie for team name and cannot add team
      vm.showAddTeamForm = false;
      var cookieObj = JSON.stringify({"showAddTeamForm": false, "myTeamID": myTeamID});
      $cookies.put(leagueID, cookieObj);
    }

    function getTeams(leagueID) {
      vm.teams = firebaseDataService.getTeams(leagueID);
      // firebaseDataService.getTeams(leagueID)
      //   .then(assignTeams);

      // function assignTeams(snapshot) {
      //   snapshot.forEach(function(childSnapshot) {
      //     $timeout(function() {
      //       vm.teams.push(childSnapshot.val());
      //     });
      //   });
      // }
    }

    function startDraft() {
      //get the teams in that league

      // sort them

      // display them 

      // go to the draft page with that ordered array and league id
    }

    ///////////////////////////////////////////
    // PRIVATE FUNCTIONS
    ///////////////////////////////////////////
    function _showCanAddTeamForm(leagueID) {
      var cookie;
      if ($cookies.get(leagueID) !== undefined){
        cookie = JSON.parse($cookies.get(leagueID));
        if (cookie.showAddTeamForm === false) return false;
        else return true;
      }
      return true;
    }

    function _activate() {
      var promises = [getTeams(vm.leagueID)];
      return $q.all(promises);
    }

  }

})();




    
    