(function() {
'use strict';

function LeagueController(firebaseDataService, $window) {
  var vm = this;

  vm.league = {};
  vm.league.resort = 'keep';
  vm.createLeague = createLeague;

  function createLeague(league) {
    //create the league
    var leagueID;
    var newLeague = {
      'name': league.name,
      'turn': 0,
      'youtubeCode': ''
    };
    var teams = [];
    var teamstoPush = [];
    leagueID = firebaseDataService.addLeague(newLeague);
    teams = league.teams.match(/(?=\S)[^,]+?(?=\s*(,|$))/g);
    if (league.resort === 'sort') {
      _shuffle(teams);
    }
    teams.forEach(function(team) {
      teamstoPush.push({'name': team})
    });
    firebaseDataService.addTeamsToLeague(teamstoPush, leagueID);
    _redirectToLeague(leagueID);
  }

  ///////////////////////////////////////////
  // PRIVATE FUNCTIONS
  ///////////////////////////////////////////
  function _redirectToLeague(id) {
    $window.location.href = id + '/draft/';
  }
  function _shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }
}

angular
  .module('app.league')
  .controller('LeagueController', LeagueController);

LeagueController.$inject = ['firebaseDataService', '$window'];

})();
