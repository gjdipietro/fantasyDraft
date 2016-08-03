(function() {
  'use strict';

  angular
    .module('app.draft')
    .controller('DraftController', DraftController)

  DraftController.$inject = ['$q', 'playerService'];

  function DraftController($q, playerService, playerPrepService) {
    var vm = this;
    vm.players = [];
    vm.youtubeCode = "";

    activate();

    function activate() {
      var promises = [getPlayers(), getPlayerHighlights()];
      return $q.all(promises).then(function() {
        console.log('Activated players');
      });
    }
    
    function getPlayers() {
      return playerService
        .getPlayers()
        .then(assignPlayers);

      function assignPlayers(resp) {
        vm.players = resp.data.players;
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
  }

  

})();