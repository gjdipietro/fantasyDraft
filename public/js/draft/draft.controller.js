(function() {
  'use strict';

  angular
    .module('app.draft')
    .controller('DraftController', DraftController);

  DraftController.$inject = ['$q', 'firebaseDataService', '$routeParams', 'playerService'];

  function DraftController($q, firebaseDataService, $routeParams, playerService) {
    var vm = this;
    vm.players = [];
    vm.search = {
      'position': ""
    };
    activate();

    function activate() {
      var promises = [getPlayers(), getPlayers(100), getPlayers(200)];
      return $q.all(promises).then(function(resp) {
        vm.players = vm.players
          .concat(resp[0].data.players, resp[1].data.players, resp[2].data.players);
      });
    }
    
    function getPlayers(offset) {
      return playerService
        .getPlayers(offset);
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
      //console.log($routeParams);
      // if (!parties) {
      //   parties = $firebaseArray(firebaseDataService.users.child(uid).child('parties'));
      // }
      // return parties;
    }
  }

      

})();