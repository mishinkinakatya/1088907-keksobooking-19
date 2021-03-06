'use strict';

(function () {

  var Price = {
    SMALL: 10000,
    BIG: 50000,
  };

  var housingType = window.data.mapFilters.querySelector('#housing-type');
  var housingPrice = window.data.mapFilters.querySelector('#housing-price');
  var housingRooms = window.data.mapFilters.querySelector('#housing-rooms');
  var housingGuests = window.data.mapFilters.querySelector('#housing-guests');
  var housingFeatures = window.data.mapFilters.querySelectorAll('#housing-features input');

  var filterPrice = function (price, itemPrice) {
    switch (price) {
      case 'low':
        return itemPrice < Price.SMALL;
      case 'middle':
        return itemPrice >= Price.SMALL && itemPrice < Price.BIG;
      case 'high':
        return itemPrice >= Price.BIG;
      default:
        return true;
    }
  };

  var getCheckedFeatures = function () {
    var checkedFeatures = [];
    housingFeatures.forEach(function (feature) {
      if (feature.checked) {
        checkedFeatures.push(feature.value);
      }
    });
    return checkedFeatures;
  };

  var filterFeatures = function (features, itemFeatures) {
    for (var j = 0; j < features.length; j++) {
      if (itemFeatures.indexOf(features[j]) === -1) {
        return false;
      }
    }
    return true;
  };

  var filterPins = function (pins) {
    var params = {
      type: housingType.value,
      price: housingPrice.value,
      rooms: housingRooms.value,
      guests: housingGuests.value,
      features: housingFeatures.value,
    };
    return pins.filter(function (item) {
      if (params.type !== 'any' && item.offer.type !== params.type) {
        return false;
      }
      if (!filterPrice(params.price, item.offer.price)) {
        return false;
      }
      if (params.rooms !== 'any' && item.offer.rooms.toString() !== params.rooms) {
        return false;
      }
      if (params.guests !== 'any' && item.offer.guests.toString() !== params.guests) {
        return false;
      }
      if (!filterFeatures(getCheckedFeatures(), item.offer.features)) {
        return false;
      }
      return true;
    });
  };

  window.filter = {
    filterPins: filterPins,
  };

})();
