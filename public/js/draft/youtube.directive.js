(function() {
  'use strict';

angular
  .module('app.draft')
  .factory('youtubeEmbed', youtubeEmbed) 

  youtubeEmbed.$inject = [
    '$document', '$q', '$rootScope'
  ];

function youtubeEmbed ($document, $q, $rootScope) {
  var y = $q.defer();

  function onScriptLoad(){
    y.resolve(window.yt);
  }

  var scriptTag = $document[0].createElement('script');
  scriptTag.type = 'text/javascript';
  scriptTag.async = true;
  scriptTag.src = 'https://www.youtube.com/player_api';
  scriptTag.onreadystatechange = function(){
    if(this.readyState == 'complete')
      onScriptLoad();
  }
  scriptTag.onload = onScriptLoad();

  var s = $document[0].getElementsByTagName('body')[0];
  s.appendChild(scriptTag);

  return {
    yt: function(){ return y.promise; }
  };

}
})();


(function() {
  'use strict';

  function youtube (youtubeEmbed, $window, $interval) {
    return {
      restrict: 'E',
      template: '<div id="player"></div>',
      scope: {
          state: '=',
          currentTime: '='
      },
      link: function(scope, element, attrs){
        youtubeEmbed.yt().then(function(yt){
          $window.onYouTubePlayerAPIReady = function(){
            scope.createPlayer = function(attrs){
              if(scope.player) 
                scope.player.destroy();
              var controls = (attrs.controls) ? attrs.controls : 1;
              var autoplay = (attrs.autoplay) ? attrs.autoplay : 0;
              var player = new YT.Player('player', {
                height: attrs.height,
                width: attrs.width,
                videoId: attrs.id,
                playerVars: { 'autoplay': autoplay, 'controls': controls, 'fullscreen': 1 },
              });
              player.addEventListener("onStateChange", function(state){
                if(state.data==1){
                  scope.timer = $interval(function(){
                    if(scope.player)
                    scope.currentTime = scope.player.getCurrentTime();
                  }, 250);
                }else{
                  if(scope.timer){
                    $interval.cancel(scope.timer);
                  }
                }
              });
              return player;
            }
            scope.player = scope.createPlayer(attrs);

            scope.$watch(function(){ return attrs.id;}, function(newVal){
              var videoId = newVal;
              scope.player = scope.createPlayer(attrs);
            });

            scope.$on('$destroy', function() {
                  // Make sure that the interval is destroyed too
                  if(scope.timer){
                    $interval.cancel(scope.timer);
                    scope.timer = null;
                  }
                });

          }
        });
      }
    };
  }

  angular
    .module('app.draft')
    .directive('youtube', youtube);

  youtube.$inject = [
    'youtubeEmbed', '$window', '$interval'
  ];

})();