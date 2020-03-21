'use strict';

var MAX_ITEM = 8;
var checkinMas = ['12:00', '13:00', '14:00'];
var checkoutMas = ['12:00', '13:00', '14:00'];
var typeMas = ['palace', 'flat', 'house', 'bungalo'];
var typeMasAccord = {
  'palace': 'Дворец',
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};
var featuresMas = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var photosMas = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var mapItem = document.querySelector('.map');
var similarPinList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('button');
var cardTemplate = document.querySelector('#card').content.querySelector('.popup');
var filtersContainer = document.querySelector('.map__filters-container');

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
        type: typeMas[randomInteger(0, 3)],
        rooms: i,
        guests: i,
        checkin: checkinMas[Math.floor(Math.random() * (2 - 0) + 0)],
        checkout: checkoutMas[Math.floor(Math.random() * (2 - 0) + 0)],
        features: masRandom(featuresMas, 5),
        description: 'описание ' + i,
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

var renderFeatures = function (masFeatures) {
  var stringFeatures = '';
  for (var i = 0; i < masFeatures.length; i++) {
    stringFeatures = stringFeatures + masFeatures[i];
    if (i !== masFeatures.length - 1) {
      stringFeatures = stringFeatures + ' ';
    }
  }
  return stringFeatures;
};

var renderPhotos = function (paramCard, srcPhoto) {
  var photo = paramCard.querySelector('img');
  var newPhoto = photo.cloneNode(true);
  newPhoto.src = srcPhoto;
  return newPhoto;
};

var renderCard = function (pinData) {
  var newCard = cardTemplate.cloneNode(true);
  var fragment = document.createDocumentFragment();
  var popupPhoto = newCard.querySelector('.popup__photos');

  newCard.querySelector('.popup__title').textContent = pinData.offer.title;
  newCard.querySelector('.popup__text--address').textContent = pinData.offer.adress;
  newCard.querySelector('.popup__text--price').textContent = pinData.offer.price + '₽/ночь';
  newCard.querySelector('.popup__type').textContent = typeMasAccord[pinData.offer.type];
  newCard.querySelector('.popup__text--capacity').textContent = pinData.offer.rooms + ' комнаты для ' + pinData.offer.guests + ' гостей';
  newCard.querySelector('.popup__text--time').textContent = 'Заезд после ' + pinData.offer.checkin + ', выезд до ' + pinData.offer.checkout;
  newCard.querySelector('.popup__features').textContent = renderFeatures(pinData.offer.features);
  newCard.querySelector('.popup__description').textContent = pinData.offer.description;

  for (var i = 0; i < pinData.offer.photos.length; i++) {
    fragment.appendChild(renderPhotos(popupPhoto, pinData.offer.photos[i]));
  }
  newCard.appendChild(fragment);

  newCard.querySelector('.popup__avatar').src = pinData.author.avatar;
  mapItem.insertBefore(newCard, filtersContainer);
};

var init = function () {
  mapItem.classList.remove('map--faded');
  var data = generateData();
  renderPins(data);
  renderCard(data[0]);
};
init();
