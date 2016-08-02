(function() {
  'use strict';

  angular
    .module('app.draft')
    .controller('DraftController', DraftController)
    .directive('youtubePlayer', youtubePlayer);

  DraftController.$inject = ['$q', 'playerService'];

  function DraftController($q, playerService) {
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
        .then(function(resp) {
          vm.players = resp.data.players;
          return vm.players;
        });
    }

    function getPlayerHighlights() {
      return playerService
        .getPlayerHighlights()
        .then(function(resp) {
          console.log(resp);
          vm.youtubeCode = resp.data.items[0].id.videoId;
          return vm.youtubeCode;
        });
    }  
  }

  youtubePlayer.$inject = ['$window'];
  function youtubePlayer ($window) {
    return {
      restrict: "E",

      scope: {
        height:   "@",
        width:    "@",
        videoid:  "@"  
      },

      template: '<div></div>',

      link: function(scope, element) {
        var tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        var player;

        $window.onYouTubeIframeAPIReady = function() {
          player = new YT.Player(element.children()[0], {
            playerVars: {
              autoplay: 1,
              html5: 1,
              theme: "light",
              modestbranding: 0,
              color: "white",
              iv_load_policy: 3,
              showinfo: 1,
              controls: 0,
            },

            height: scope.height,
            width: scope.width,
            videoId: scope.videoid
          });
        };
      },  
    };
  }

})();