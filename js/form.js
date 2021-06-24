const offerForm = document.querySelector('.ad-form');
const formFieldsets = offerForm.querySelectorAll('fieldset');
const mapForm = document.querySelector('.map__filters');
const mapFilters = document.querySelectorAll('.map__filter');
const mapFeatures = document.querySelectorAll('.map__feature');

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

activatePage();
