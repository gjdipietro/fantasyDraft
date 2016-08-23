(function() {
  'use strict';

  angular
    .module('app.draft')
    .controller('DraftController', DraftController);

  DraftController.$inject = ['$q', 'firebaseDataService', '$routeParams', 'playerService'];

  function DraftController($q, firebaseDataService, $routeParams, playerService) {
    var vm = this;
    vm.players = [];
    vm.search = {'position': ""};
    vm.takenPlayers = [];
    vm.selected = {};
    
    //Interface
    vm.draftPlayer = draftPlayer;
    vm.selectPlayer = selectPlayer;
    vm.clearSearch = clearSearch;
    
    activate();

    function activate() {
      vm.players = firebaseDataService.getPlayers();
      
      // var promises = [getPlayers(), getPlayers(100), getPlayers(200), getPlayers(300)];
      // return $q.all(promises).then(function(resp) {
      //   vm.players = vm.players
      //     .concat(resp[0].data.players, resp[1].data.players, resp[2].data.players, resp[3].data.players);
      //   vm.selected =  vm.players[0];
      // });
    }
    
    function getPlayers(offset) {
      return playerService
        .getPlayers(offset);
    }

    function clearSearch () {
      vm.search.$ = "";
    }
    function draftPlayer(player) {
      var index = player.rank-1;
      vm.takenPlayers.push(player);
      firebase.database().ref().child('players/' + index).update({'drafted': 1});
    }

    function selectPlayer(player) {
      vm.selected = player;
    }

    ////////////////////////////////////////
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