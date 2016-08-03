(function() {
'use strict';

angular
  .module('app.league')
  .controller('LeagueController', LeagueController);

  LeagueController.$inject = ['$firebaseObject'];

  function LeagueController($firebaseObject) {
    var vm = this;
    
    vm.league = {
      'name': 'FFP',
      'teams': ['abc', 'def', 'ghi', 'mnop']
    };

    vm.createLeague = createLeague;

    function createLeague(league) {
      sync.$add(league).then(function(newChildRef) {
        $location.path('/league/'+newChildRef.key());
      });
    }
  }

})();


