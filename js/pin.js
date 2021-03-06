'use strict';
(function () {
  var ADVERTISEMENT_COUNT = 5;

  var newPin = document.querySelector('#pin').content.querySelector('.map__pin');

  var pinSize = {
    height: newPin.offsetHeight,
    halfWidth: newPin.offsetWidth / 2,
  };

  var renderPin = function (pin) {
    var pinItem = newPin.cloneNode(true);
    pinItem.style.left = (pin.location.x - pinSize.halfWidth) + 'px';
    pinItem.style.top = (pin.location.y - pinSize.height) + 'px';
    pinItem.querySelector('img').setAttribute('src', pin.author.avatar);
    pinItem.querySelector('img').setAttribute('alt', 'Заголовок объявления');

    pinItem.addEventListener('click', function () {
      window.modal.render(pin, pinItem);
    });

    pinItem.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        window.modal.render(pin, pinItem);
      }
    });

    return pinItem;
  };

  window.pin = {
    delete: function () {
      var newPins = document.querySelectorAll('.map__pin:not(.map__pin--main)');
      newPins.forEach(function (pinItem) {
        pinItem.remove();
      });
    },
    render: function (advertisements) {
      var takeNumber = advertisements.length > ADVERTISEMENT_COUNT ? ADVERTISEMENT_COUNT : advertisements.length;
      window.pin.delete();
      for (var j = 0; j < takeNumber; j++) {
        if (advertisements[j].offer) {
          window.data.mapPins.appendChild(renderPin((advertisements[j])));
        }
      }
    },
  };

})();
