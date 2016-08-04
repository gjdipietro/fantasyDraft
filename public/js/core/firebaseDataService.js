(function() {
  'use strict';

  angular
    .module('app')
    .factory('firebaseDataService', firebaseDataService);

  function firebaseDataService() {
    var root = firebase.database().ref();

    var service = {
      root: root,
      name: root.child('name'),
      teams: root.child('teams')
    };

    return service;
  }

})();