(function() {
  'use strict';

  angular
    .module('app.draft')
    .controller('DraftController', DraftController);

  DraftController.$inject = ['$q', 'firebaseDataService', '$routeParams'];

  function DraftController($q, firebaseDataService, $routeParams) {
    var vm = this;
    vm.players = [];
    vm.youtubeCode = "";

    activate();

    function activate() {
      var promises = [getPlayers(), getLeague()];
      return $q.all(promises).then(function() {
        console.log($routeParams);
      });
    }
    
    function getPlayerHighlights() {
      return playerService
        .getPlayerHighlights()
        .then(getYoutubeCode)
        .catch(getYoutubeCodeFailed);

      function getYoutubeCode(resp) {
        vm.youtubeCode = resp.data.items[0].id.videoId;
        return vm.youtubeCode;
      }
      function getYoutubeCodeFailed(e) {
        return $q.reject(e);
      }
    }

    function getLeague() {
      console.log($routeParams);
      // if (!parties) {
      //   parties = $firebaseArray(firebaseDataService.users.child(uid).child('parties'));
      // }
      // return parties;
    }
  }

      

})();