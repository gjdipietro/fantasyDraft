(function() {
  'use strict';

  angular
    .module('app.draft')
    .controller('DraftController', DraftController);

  DraftController.$inject = ['$q', 'playerService'];

  function DraftController($q, playerService) {
    var vm = this;
    vm.players = [];

    activate();

    function activate() {
      var promises = [getPlayers()];

      return $q.all(promises).then(function() {
        console.log('Activated players');
      });
    }

    function getPlayers() {
      return playerService
        .getPlayers()
        .then(function(resp) {
          vm.players = resp.data.players;
          return vm.players;
        });
    }  
  }

})();