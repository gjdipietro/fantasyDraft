(function() {
  'use strict';

  // Initialize Firebase
  var config = {
    apiKey: 'AIzaSyAkL9b0eJwOTZE_-A8Q9HfgwzbFx9-4rjo',
    authDomain: 'fantasy-draft-a5cdb.firebaseapp.com',
    databaseURL: 'https://fantasy-draft-a5cdb.firebaseio.com',
    storageBucket: 'fantasy-draft-a5cdb.appspot.com',
  };
  firebase.initializeApp(config);

  function firebaseDataService($firebaseArray, $firebaseObject) {
    var db = firebase.database().ref();
    var service = {
      addLeague: addLeague,
      addTeamsToLeague : addTeamsToLeague,
      getLeagueInfo: getLeagueInfo,
      getPlayers: getPlayers,
      getTeams: getTeams,
      updateTeamInfo: updateTeamInfo,
      draftPlayer: draftPlayer,
      updateLeague: updateLeague
    };
    return service;
    function addLeague(league) {
      return db.child('leagues').push(league).key;
    }
    function addTeamsToLeague (teams, leagueID) {
      teams.forEach(function (team) {
        return db.child('teams/' + leagueID).push(team);
      });
    }
    function getPlayers() {
      var players = db.child('players/');
      return $firebaseArray(players);
    }
    function getLeagueInfo(leagueID) {
      var league = db.child('leagues/' + leagueID);
      return $firebaseObject(league);
    }
    function getTeams(leagueID) {
      var teams = db.child('teams/' + leagueID);
      return $firebaseArray(teams);
    }
    function draftPlayer (player, draft) {
      var index = player.rank - 1;
      if (!draft) { // this is an undraft
        return db.child('players/' + index).update({'drafted': 0});
      } else { // this is an normal draft
        return db.child('players/' + index).update({'drafted': 1});
      }
    }
    function updateLeague(updates, leagueID) {
      return db.child('leagues/' + leagueID).update(updates);
    }
    function updateTeamInfo(updates, teamID, leagueID) {
      return db.child('teams/' + leagueID + '/' + teamID).update(updates);
    }
  }

  angular
    .module('app.core')
    .factory('firebaseDataService', firebaseDataService);

  firebaseDataService.$inject = [
    '$firebaseArray',
    '$firebaseObject'
  ];

})();
