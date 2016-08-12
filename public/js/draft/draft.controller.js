(function() {
  'use strict';

  angular
    .module('app.draft')
    .controller('DraftController', DraftController);

  DraftController.$inject = ['$q', 'firebaseDataService', '$routeParams', 'playerService'];

  function DraftController($q, firebaseDataService, $routeParams, playerService) {
    var vm = this;
    vm.players = [];

    activate();

    function activate() {
      var promises = [getPlayers(), getPlayers(100), getLeague()];
      return $q.all(promises).then(function() {
        //console.log($routeParams);
      });
    }
    
    function getPlayers(offset) {
      return playerService
        .getPlayers(offset)
        .then(assignPlayers);
      function assignPlayers(resp) {
        resp.data.players.forEach(function(x){
          vm.players.unshift(x);
        })
        console.log(vm.players);
        return vm.players;
      }
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