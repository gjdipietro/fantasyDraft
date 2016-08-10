(function() {
'use strict';

angular
  .module('app.league')
  .controller('LeagueSetupController', LeagueSetupController);

  LeagueSetupController.$inject = ['$q', 'firebaseDataService', '$routeParams', '$cookies', '$firebaseArray', '$firebaseObject'];

  function LeagueSetupController($q, firebaseDataService, $routeParams, $cookies, $timeout, $firebaseArray, $firebaseObject) {
    var vm = this;   

    vm.data = {};
    vm.leagueName = "";
    vm.leagueID = $routeParams.id;
    vm.showAddTeamForm = _showCanAddTeamForm($routeParams.id);
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

    function getLeagueInfo(leagueID) {
      vm.data = firebaseDataService.getLeagueInfo(leagueID);
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
      var promises = [getLeagueInfo($routeParams.id)];
      return $q.all(promises);
    }

  }

})();




    
    