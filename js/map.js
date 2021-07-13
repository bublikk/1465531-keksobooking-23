import {activatePage} from './form.js';
import {createCustomPopup} from './popup.js';

const DEFAULT_COORDINATES = {
  lat: 35.68911,
  lng: 139.69211,
};
const PRIMARY_ICON_SIZE = [52, 52];
const PRIMARY_ICON_ANCHOR = [26, 52];
const SECONDARY_ICON_SIZE = [40, 40];
const SECONDARY_ICON_ANCHOR = [20, 40];
// const SIMILAR_OFFER_COUNT = 10;

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
  iconSize: PRIMARY_ICON_SIZE,
  iconAnchor: PRIMARY_ICON_ANCHOR,
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

const markerGroup = L.layerGroup().addTo(map);

const icon = L.icon({
  iconUrl: 'img/pin.svg',
  iconSize: SECONDARY_ICON_SIZE,
  iconAnchor: SECONDARY_ICON_ANCHOR,
});

const createMarker = ({author, offer, location}) => {
  const {lat, lng} = location;

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
    .addTo(markerGroup)
    .bindPopup(
      createCustomPopup({author, offer, location}),
    );
};

const renderSimilarList = (similarOffers) => {
  similarOffers.forEach((similarOffer) => {
    createMarker(similarOffer);
  });
};

const resetMap = () => {
  map
    .setView({
      lat: DEFAULT_COORDINATES.lat,
      lng: DEFAULT_COORDINATES.lng,
    }, 13);

  mainPinMarker
    .setLatLng({
      lat: DEFAULT_COORDINATES.lat,
      lng: DEFAULT_COORDINATES.lng,
    });
};

export {DEFAULT_COORDINATES, renderSimilarList, resetMap};
