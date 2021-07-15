import {DEFAULT_COORDINATES, resetMap} from './map.js';

const offerForm = document.querySelector('.ad-form');
const formFieldsets = offerForm.querySelectorAll('fieldset');
const mapForm = document.querySelector('.map__filters');
const mapFilters = document.querySelectorAll('.map__filter');
const mapFeatures = document.querySelectorAll('.map__feature');
const addressInput = document.querySelector('#address');
const resetButton = document.querySelector('.ad-form__reset');
const avatarPreview = document.querySelector('.ad-form-header__preview img');
const photoPreview = document.querySelector('.ad-form__photo');

const deactivatePage = () => {
  offerForm.classList.add('ad-form--disabled');
  mapForm.classList.add('map__filters--disabled');

  formFieldsets.forEach((formFieldset) => formFieldset.setAttribute('disabled', 'disabled'));

  mapFilters.forEach((mapFilter) => mapFilter.setAttribute('disabled', 'disabled'));

  mapFeatures.forEach((mapFeature) => mapFeature.setAttribute('disabled', 'disabled'));
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
  mapForm.reset();

  document.querySelector('#price').placeholder = 1000;
  document.querySelector('#price').min = 0;

  avatarPreview.src = 'img/muffin-grey.svg';

  while (photoPreview.firstChild) {
    photoPreview.removeChild(photoPreview.firstChild);
  }

  addressInput.value = `${DEFAULT_COORDINATES.lat}, ${DEFAULT_COORDINATES.lng}`;

  resetMap();
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();

  resetForm();
});

export {activatePage, resetForm};
