'use strict';
(function () {
  var DEBOUNCE_INTERVAL = 1500;

  window.debounce = function (cb) {
    var lastTimeout;
    return function () {
      var parameters = arguments;
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(function () {
        cb.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  };

})();
