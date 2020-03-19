'use strict';

var checkinMas = ['12: 00', '13: 00', '14: 00'];
var checkoutMas = ['12: 00', '13: 00', '14: 00'];
var typeMas = ['palace, flat, house', 'bungalo'];
var featuresMas = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosMas = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var newObjects = [];

var masRandom = function (itemsMas, maxCount) {
  var itemsMasRandom = [];
  var minItem = Math.random() * (maxCount - 0) + 0;
  var finalMin = Math.random() * (maxCount - minItem) + minItem;
  for (var y = 0; y <= finalMin; y++) {
    itemsMasRandom[y] = itemsMas[y];
  }
  return itemsMasRandom;
};

var randomMeasure = function (measure) {
  return Math.random() * (measure - 0) + 0;
};

var i;
var mapItem = document.querySelector('.map');
var mapWidth = mapItem.getBoundingClientRect().width;
var mapHeight = mapItem.getBoundingClientRect().height;
for (i = 0; i <= 7; i++) {
  var locationX = randomMeasure(mapWidth);
  var locationY = randomMeasure(mapHeight);
  newObjects[i] = {
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
      x: Math.random() * (mapWidth - 0) + 0,
      y: Math.random() * (630 - 130) + 130
    }
  };
}

mapItem.classList.remove('map--faded');

var similarPinList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('button');
var fragment = document.createDocumentFragment();

var renderPin = function (currentOdject) {
  var newPin = pinTemplate.cloneNode(true);
  newPin.querySelector('.map__pin').style = 'left: ' + randomMeasure(mapWidth) + 40 + 'px; top: ' + randomMeasure(mapHeight) + 40 + 'px';
  newPin.querySelector('.map__pin').src = currentOdject.author.avatar;
  newPin.querySelector('.map__pin').alt = currentOdject.offer.title;
};

for (i = 0; i <= newObjects.length; i++) {
  fragment.appendChild(renderPin(newObjects[i]));
}

similarPinList.appendChild(fragment);

