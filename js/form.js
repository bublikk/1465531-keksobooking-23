import {DEFAULT_COORDINATES, resetMap} from './map.js';
import {handleMessage} from './filter.js';

const offerForm = document.querySelector('.ad-form');
const filterForm = document.querySelector('.map__filters');
const formFieldsets = offerForm.querySelectorAll('fieldset');
const mapForm = document.querySelector('.map__filters');
const mapFilters = document.querySelectorAll('.map__filter');
const mapFeatures = document.querySelectorAll('.map__feature');
const addressInput = document.querySelector('#address');
const resetButton = document.querySelector('.ad-form__reset');
const typeFilter = document.querySelector('[name="housing-type"]');
const priceFilter = document.querySelector('[name="housing-price"]');
const roomsFilter = document.querySelector('[name="housing-rooms"]');
const guestsFilter = document.querySelector('[name="housing-guests"]');

const deactivatePage = () => {
  offerForm.classList.add('ad-form--disabled');
  mapForm.classList.add('map__filters--disabled');

  formFieldsets.forEach((formFieldset) => formFieldset.setAttribute('disabled', 'disabled'));

  mapFilters.forEach((mapFilter) => mapFilter.setAttribute('disabled', 'disabled'));

  mapFeatures.forEach((mapFeature) => mapFeature.setAttribute('disabled', 'disabled'));

  // Этот код не работает и обработчики не удаляются (спросить у Иры)
  if (mapForm.classList.contains('map__filters--disabled')) {
    typeFilter.removeEventListener('change', () => handleMessage(typeFilter));
    priceFilter.removeEventListener('change', () => handleMessage(priceFilter));
    roomsFilter.removeEventListener('change', () => handleMessage(roomsFilter));
    guestsFilter.removeEventListener('change', () => handleMessage(guestsFilter));
  }
};

deactivatePage();

const activatePage = () => {
  offerForm.classList.remove('ad-form--disabled');
  mapForm.classList.remove('map__filters--disabled');

  formFieldsets.forEach((formFieldset) => formFieldset.removeAttribute('disabled'));

  mapFilters.forEach((mapFilter) => mapFilter.removeAttribute('disabled'));

  mapFeatures.forEach((mapFeature) => mapFeature.removeAttribute('disabled'));
};

const resetForm = () => {
  offerForm.reset();
  filterForm.reset();

  document.querySelector('#price').placeholder = 1000;
  document.querySelector('#price').min = 0;

  addressInput.value = `${DEFAULT_COORDINATES.lat}, ${DEFAULT_COORDINATES.lng}`;

  resetMap();
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  resetForm();
});

export {activatePage, resetForm};
