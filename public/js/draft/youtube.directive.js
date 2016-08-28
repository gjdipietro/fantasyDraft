(function() {
  'use strict';

  function youtubePlayer ($window) {
    return {
      restrict: 'E',

      scope: {
        height:   '@',
        width:    '@',
        videoid:  '@'
      },

      template: '<div></div>',

      link: function(scope, element) {
        var tag = document.createElement('script');
        tag.src = 'https://www.youtube.com/iframe_api';
        var firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

        var player;

        $window.onYouTubeIframeAPIReady = function() {
          player = new YT.Player(element.children()[0], {
            playerVars: {
              autoplay: 1,
              html5: 1,
              theme: 'light',
              modestbranding: 0,
              color: 'white',
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

  angular
    .module('app.draft')
    .directive('youtubePlayer', youtubePlayer);

  youtubePlayer.$inject = [
    '$window'
  ];

})();