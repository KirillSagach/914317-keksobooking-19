'use strict';

var MAX_ITEM = 8;
var checkinMas = ['12: 00', '13: 00', '14: 00'];
var checkoutMas = ['12: 00', '13: 00', '14: 00'];
var typeMas = ['palace, flat, house', 'bungalo'];
var featuresMas = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosMas = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var mapItem = document.querySelector('.map');
var similarPinList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('button');

var masRandom = function (itemsMas, maxCount) {
  var itemsMasRandom = [];
  var minItem = Math.random() * (maxCount - 0) + 0;
  var finalMin = Math.random() * (maxCount - minItem) + minItem;
  for (var y = 0; y <= finalMin; y++) {
    itemsMasRandom[y] = itemsMas[y];
  }
  return itemsMasRandom;
};

var randomInteger = function (min, max) {
  // случайное число от min до (max+1)
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var generateData = function () {
  var newPins = [];
  var mapWidth = mapItem.getBoundingClientRect().width;
  for (var i = 1; i <= MAX_ITEM; i++) {
    var locationX = randomInteger(0, mapWidth);
    var locationY = randomInteger(130, 630);
    newPins.push({
      author: {
        avatar: 'img/avatars/user0' + i + '.png'
      },
      offer: {
        title: 'Заголовок ' + i,
        adress: locationX + ',' + locationY,
        price: i * 20,
        type: typeMas[Math.random() * (3 - 0) + 0],
        rooms: i,
        guests: i,
        checkin: checkinMas[Math.floor(Math.random() * (2 - 0) + 0)],
        checkout: checkoutMas[Math.floor(Math.random() * (2 - 0) + 0)],
        features: masRandom(featuresMas, 5),
        description: 'описание',
        photos: masRandom(photosMas, 2)
      },
      location: {
        x: locationX,
        y: locationY
      }
    });
  }
  return newPins;
};

var renderPin = function (currentOdject) {
  var mapPin = pinTemplate.cloneNode(true);
  mapPin.style.left = currentOdject.location.x - mapPin.offsetWidth / 2 + 'px';
  mapPin.style.top = currentOdject.location.y - mapPin.offsetHeight + 'px';

  var pinImg = mapPin.querySelector('img');
  pinImg.src = currentOdject.author.avatar;
  pinImg.alt = currentOdject.offer.title;

  return mapPin;
};

var renderPins = function (newPins) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < newPins.length; i++) {
    fragment.appendChild(renderPin(newPins[i]));
  }
  similarPinList.appendChild(fragment);
};

var init = function () {
  mapItem.classList.remove('map--faded');
  var data = generateData();
  renderPins(data);
};
init();
