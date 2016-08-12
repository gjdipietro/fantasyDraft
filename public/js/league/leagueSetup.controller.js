(function() {
'use strict';

angular
  .module('app.league')
  .controller('LeagueSetupController', LeagueSetupController);

  LeagueSetupController.$inject = ['$q', 'firebaseDataService', '$routeParams', '$cookies', '$firebaseArray', '$firebaseObject'];

  function LeagueSetupController($q, firebaseDataService, $routeParams, $cookies, $timeout, $firebaseArray, $firebaseObject) {
    var vm = this;   

    vm.leagueInfo = {};
    vm.leagueID = $routeParams.id;
    vm.showAddTeamForm = _showCanAddTeamForm($routeParams.id);
    vm.addTeamToLeague = addTeamToLeague;
    vm.startDraft = startDraft;
    _activate();

    function addTeamToLeague(team, leagueID) {
      var newTeam = {
        "name": team.name,
        "league": leagueID
      };

      var myTeamID = firebaseDataService.addTeamToLeague(newTeam, leagueID);

      //set cookie for team name and cannot add team
      vm.showAddTeamForm = false;
      var cookieObj = JSON.stringify({"showAddTeamForm": false, "myTeamID": myTeamID});
      $cookies.put(leagueID, cookieObj);
    }

    function getLeagueInfo(leagueID) {
      vm.leagueInfo = firebaseDataService.getLeagueInfo(leagueID);
    }

    function getTeamInfo(leagueID) {
      vm.teams = firebaseDataService.getTeamInfo(leagueID);
    }

    function startDraft(teams, leagueID) {
      var order = 1;
      var update = {};
      shuffle(teams);
      teams.forEach(function(team){
        update = {"draftOrder" : order};
        firebaseDataService.updateTeamInfo(update, team.$id, leagueID);
        order++;
      });

      function shuffle(array) {
        var currentIndex = array.length, temporaryValue, randomIndex;

        // While there remain elements to shuffle...
        while (0 !== currentIndex) {

          // Pick a remaining element...
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex -= 1;

          // And swap it with the current element.
          temporaryValue = array[currentIndex];
          array[currentIndex] = array[randomIndex];
          array[randomIndex] = temporaryValue;
        }

        return array;
      }
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
      var promises = [getLeagueInfo($routeParams.id), getTeamInfo($routeParams.id)];
      return $q.all(promises);
    }

  }

})();




    
    