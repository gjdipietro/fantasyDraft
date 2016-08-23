(function() {
  'use strict';

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyAkL9b0eJwOTZE_-A8Q9HfgwzbFx9-4rjo",
    authDomain: "fantasy-draft-a5cdb.firebaseapp.com",
    databaseURL: "https://fantasy-draft-a5cdb.firebaseio.com",
    storageBucket: "fantasy-draft-a5cdb.appspot.com",
  };
  firebase.initializeApp(config);

  angular
    .module('app.core')
    .factory('firebaseDataService', firebaseDataService);

  firebaseDataService.$inject = ['$firebaseArray', '$firebaseObject'];

  function firebaseDataService($firebaseArray, $firebaseObject) {
    var db = firebase.database().ref();
    var service = {
      addLeague: addLeague,
      addTeamToLeague : addTeamToLeague,
      getTeamInfo: getTeamInfo,
      getLeagueInfo: getLeagueInfo,
      updateTeamInfo: updateTeamInfo,
      getPlayers: getPlayers
    };
    return service;
    
    function addLeague(league) {
      return db.child('leagues').push(league).key;
    }

    function addTeamToLeague (team, leagueID) {
      return db.child('teams/' + leagueID).push(team).key;
    }

    function getLeagueInfo(leagueID) {
      var ref = db.child('leagues/' + leagueID);
      return $firebaseObject(ref);
    }

    function getTeamInfo(leagueID) {
      var ref = db.child('teams/' + leagueID);
      return $firebaseArray(ref);
    }

    function updateTeamInfo(updates, teamID, leagueID) {
      return db.child('teams/' + leagueID + '/' + teamID).update(updates);
    }

    function getPlayers() {
      var ref = db.child('players/');
      return $firebaseArray(ref);
    }
    
  }

})();