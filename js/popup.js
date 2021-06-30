import {generateOffers, TYPES} from './mock.js';

const ADVERT_COUNT = 1;

const mapCanvasElement = document.querySelector('#map-canvas');
const similarOfferTemplate = document.querySelector('#card')
  .content
  .querySelector('.popup');

const similarListFragment = document.createDocumentFragment();

const renderList = (list) => {
  list.forEach(({author, offer}) => {
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
      ? offerElement.querySelector('.popup__type').textContent = TYPES[type].name
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
      const photoItem = photoList.querySelector('.popup__photo');
      const copyOfferPhotos = photos.slice();

      copyOfferPhotos.forEach((photo) => {
        const photoElement = photoItem.cloneNode(true);
        photoElement.src = photo;
        photoList.appendChild(photoElement);
      });

      photoList.children[0].remove();
    } else {
      offerElement.querySelector('.popup__photos').classList.add('hidden');
    }

    if (features) {
      const featureList = offerElement.querySelector('.popup__features');
      const featureListElements = featureList.querySelectorAll('.popup__feature');
      const copyOfferFeatures = features.slice();

      const modifiers = copyOfferFeatures.map((feature) => `popup__feature--${feature}`);

      featureListElements.forEach((item) => {
        const modifier = item.classList[1];

        if (!modifiers.includes(modifier)) {
          item.remove();
        }
      });
    } else {
      offerElement.querySelector('.popup__features').classList.add('hidden');
    }

    similarListFragment.appendChild(offerElement);
  });

  mapCanvasElement.appendChild(similarListFragment);
};

const similarOffers = generateOffers(ADVERT_COUNT);

renderList(similarOffers);
