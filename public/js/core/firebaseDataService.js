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
      getTeams: getTeams,
      getLeagueInfo: getLeagueInfo
    };
    return service;
    
    function addLeague(league) {
      return db.child('leagues').push(league).key;
    }

    function addTeamToLeague (team, leagueID) {
      return db.child('/leagues/' + leagueID).child('teams').push(team).key;
    }

    function getLeagueInfo(leagueID) {
      var data = {};
      var ref = db.child('/leagues/' + leagueID);
      var teamsref = db.child('/leagues/' + leagueID + '/teams');
      data = $firebaseObject(ref);
      data.team = $firebaseArray(teamsref);
      return data;
    }

    function getTeams(leagueID) {
      var ref = db.child('/leagues/' + leagueID).child('teams');
      return $firebaseArray(ref);
    }
  }

})();