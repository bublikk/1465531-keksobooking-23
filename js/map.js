import {activatePage} from './form.js';
import {generateOffers} from './mock.js';

const DEFAULT_COORDINATES = {
  lat: 35.68911,
  lng: 139.69211,
};
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

// Напишите код, который добавит на карту метки объявлений. Иконка для меток pin.svg.
// Для отображения используйте данные для разработки, которые мы генерировали несколько заданий назад
const createCustomPopup = ({lat, lng, title}) => (
  `<article class="popup">
  <img src="img/avatars/user01.png" class="popup__avatar" width="70" height="70" alt="Аватар пользователя">
  <h3 class="popup__title">${title}</h3>
  <p class="popup__text popup__text--address">${lat}, ${lng}</p>
  <p class="popup__text popup__text--price">5200 <span>₽/ночь</span></p>
  <h4 class="popup__type">Квартира</h4>
  <p class="popup__text popup__text--capacity">2 комнаты для 3 гостей</p>
  <p class="popup__text popup__text--time">Заезд после 14:00, выезд до 10:00</p>
  <ul class="popup__features">
    <li class="popup__feature popup__feature--wifi"></li>
    <li class="popup__feature popup__feature--dishwasher"></li>
    <li class="popup__feature popup__feature--parking"></li>
    <li class="popup__feature popup__feature--washer"></li>
    <li class="popup__feature popup__feature--elevator"></li>
    <li class="popup__feature popup__feature--conditioner"></li>
  </ul>
  <p class="popup__description">Великолепная квартира-студия в центре Токио. Подходит как туристам, так и бизнесменам. Квартира полностью укомплектована и недавно отремонтирована.</p>
  <div class="popup__photos">
    <img src="" class="popup__photo" width="45" height="40" alt="Фотография жилья">
  </div>
  </article>`
);

const myArray = generateOffers(10);

myArray.forEach(({location}) => {
  const {lat, lng} = location;

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
      createCustomPopup(location),
      {
        keepInView: true,
      },
    );
});
