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

  function firebaseDataService() {
    var db = firebase.database().ref();
    var service = {
      addLeague: addLeague,
      adTeamToLeague: addTeamToLeague
    };

    return service;
    
    function addLeague(league) {
      return db.child('leagues').push(league).key;
    }

    function addTeamToLeague(team, id) {
      db.ref('/leagues/' + id).push(team);
    }
  }

})();