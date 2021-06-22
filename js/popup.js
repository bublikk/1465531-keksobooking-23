import {generateOffers} from './mock.js';

const mapCanvas = document.querySelector('#map-canvas');
const similarOfferTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const similarOffers = generateOffers();

const similarListFragment = document.createDocumentFragment();

similarOffers.forEach(({author, offer}) => {
  const {avatar} = author;
  const {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos} = offer;

  const offerElement = similarOfferTemplate.cloneNode(true);

  avatar
    ? offerElement.querySelector('.popup__avatar').src = avatar
    : offerElement.querySelector('.popup__avatar').classList.add('hidden');

  title
    ? offerElement.querySelector('.popup__title').textContent = title
    : offerElement.querySelector('.popup__title').classList.add('hidden');

  address
    ? offerElement.querySelector('.popup__text--address').textContent = address
    : offerElement.querySelector('.popup__text--address').classList.add('hidden');

  price
    ? offerElement.querySelector('.popup__text--price').innerHTML = `${price} <span>₽/ночь</span>`
    : offerElement.querySelector('.popup__text--price').classList.add('hidden');

  type
    ? offerElement.querySelector('.popup__type').textContent = type
    : offerElement.querySelector('.popup__type').classList.add('hidden');

  rooms && guests
    ? offerElement.querySelector('.popup__text--capacity').textContent = `${rooms} комнаты для ${guests} гостей`
    : offerElement.querySelector('.popup__text--capacity').classList.add('hidden');

  checkin && checkout
    ? offerElement.querySelector('.popup__text--time').textContent = `Заезд после ${checkin}, выезд до ${checkout}`
    : offerElement.querySelector('.popup__text--time').classList.add('hidden');

  description
    ? offerElement.querySelector('.popup__description').textContent = description
    : offerElement.querySelector('.popup__description').classList.add('hidden');

  if (photos) {
    const photoList = offerElement.querySelector('.popup__photos');
    photoList.innerHTML = '';

    const copyOfferPhotos = photos.slice();

    copyOfferPhotos.forEach((photo) => {
      photoList.insertAdjacentHTML('beforeend', `
        <img src="${photo}" class="popup__photo" width="45" height="40" alt="Фотография жилья">
        </img>
      `);
    });
  } else {
    offerElement.querySelector('.popup__photos').classList.add('hidden');
  }

  if (features) {
    const featuresList = offerElement.querySelector('.popup__features');
    featuresList.innerHTML = '';

    const copyFeaturesPhotos = features.slice();

    copyFeaturesPhotos.forEach((feature) => {
      featuresList.insertAdjacentHTML('beforeend', `
        <li class="popup__feature popup__feature--${feature}">
        </li>
      `);
    });
  } else {
    offerElement.querySelector('.popup__features').classList.add('hidden');
  }

  similarListFragment.appendChild(offerElement);
});

mapCanvas.appendChild(similarListFragment);
