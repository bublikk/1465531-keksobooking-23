import {activatePage} from './form.js';
import {generateOffers, TYPES} from './mock.js';

const DEFAULT_COORDINATES = {
  lat: 35.68911,
  lng: 139.69211,
};
const ADVERT_COUNT = 10;
const addressInput = document.querySelector('#address');

const map = L.map('map-canvas')
  .on('load', () => {
    activatePage();
    addressInput.value = `${DEFAULT_COORDINATES.lat}, ${DEFAULT_COORDINATES.lng}`;
  })
  .setView({
    lat: DEFAULT_COORDINATES.lat,
    lng: DEFAULT_COORDINATES.lng,
  }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainPinMarker = L.marker(
  {
    lat: DEFAULT_COORDINATES.lat,
    lng: DEFAULT_COORDINATES.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (evt) => {
  const latitude = evt.target.getLatLng().lat.toFixed(5);
  const longitude = evt.target.getLatLng().lng.toFixed(5);
  addressInput.value = `${latitude}, ${longitude}`;
});

const createCustomPopup = ({author, offer}) => {
  const {avatar} = author;
  const {title, address, price, type, rooms, guests, checkin, checkout, features, description, photos} = offer;

  const similarOfferTemplate = document.querySelector('#card').content.querySelector('.popup');
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

  return offerElement;
};

const similarOffers = generateOffers(ADVERT_COUNT);

similarOffers.forEach(({author, offer, location}) => {
  const {lat, lng} = location;
  // console.log(similarOffers[i]);
  // console.log(location);
  // console.log(lat);
  // console.log(lng);

  const icon = L.icon({
    iconUrl: 'img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  marker
    .addTo(map)
    .bindPopup(
      createCustomPopup({author, offer, location}),
    );
});
