(function() {
  'use strict';

  angular
    .module('app', [
    	'ngRoute',
    	'firebase',
    	'app.draft',
    	'app.league'
    ]);
})();