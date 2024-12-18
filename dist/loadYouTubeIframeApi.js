'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _loadScript = require('load-script');

var _loadScript2 = _interopRequireDefault(_loadScript);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = emitter => {
  /**
   * A promise that is resolved when window.onYouTubeIframeAPIReady is called.
   * The promise is resolved with a reference to window.YT object.
   */
  const iframeAPIReady = new Promise(resolve => {
    if (window.YT && window.YT.Player && window.YT.Player instanceof Function) {
      resolve(window.YT);

      return;
    } else {
      (0, _loadScript2.default)('/.proxy/youtube/iframe_api', (error, script) => {
        if (error) {
          emitter.trigger('error', error);
        } else {
          const original = script.textContent;
          const proxyReplaced = original.replace('https://www.youtube.com', '/.proxy/youtube');
          script.textContent = proxyReplaced;
        }
      });
    }

    const previous = window.onYouTubeIframeAPIReady;

    // The API will call this function when page has finished downloading
    // the JavaScript for the player API.
    window.onYouTubeIframeAPIReady = () => {
      if (previous) {
        previous();
      }

      resolve(window.YT);
    };
  });

  return iframeAPIReady;
};

module.exports = exports['default'];