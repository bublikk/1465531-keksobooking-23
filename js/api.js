import {renderSimilarList} from './map.js';
import {activateMapFilters, resetForm} from './form.js';
import {debounce} from './debounce.js';
import {removeMarkers} from './map.js';
import {filter} from './filter.js';

const ALERT_SHOW_TIME = 5000;
const RENDER_DELAY = 500;

const offerForm = document.querySelector('.ad-form');
const body = document.querySelector('body');
const mapForm = document.querySelector('.map__filters');
const resetButton = document.querySelector('.ad-form__reset');

let data = null;

const showFatal = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const renderPopupMessage = (messageType) => {
  const messageTemplate = document.querySelector(`#${messageType}`).content.querySelector(`.${messageType}`);
  const messageFragment = document.createDocumentFragment();
  const messageElement = messageTemplate.cloneNode(true);
  messageFragment.appendChild(messageElement);

  body.appendChild(messageFragment);

  const handleKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();

      messageElement.remove();
      document.removeEventListener('keydown', handleKeydown);
    }
  };

  document.addEventListener('keydown', handleKeydown);

  const handleDocumentClick = (evt) => {
    if (messageElement.contains(evt.target)) {
      evt.preventDefault();

      messageElement.remove();
      document.removeEventListener('click', handleDocumentClick);
    }
  };

  document.addEventListener('click', handleDocumentClick);

  if (messageType === 'error') {
    const errorButton = document.querySelector('.error__button');

    const handleButtonClick = (evt) => {
      evt.preventDefault();

      messageElement.remove();
      errorButton.removeEventListener('click', handleButtonClick);
    };

    errorButton.addEventListener('click', handleButtonClick);
  }
};

const getData = () => {
  fetch('https://23.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response;
      }
      throw new Error(`${response.status} — ${response.statusText}`);
    })
    .then((response) => response.json())
    .then((offers) => {
      data = offers;
      renderSimilarList(filter(offers));
      mapForm.addEventListener('change', () => {
        (debounce(() => {
          removeMarkers();
          renderSimilarList(filter(offers));
        }, RENDER_DELAY))();
      });
      resetButton.addEventListener('click', (evt) => {
        evt.preventDefault();

        resetForm();
        removeMarkers();
        renderSimilarList(filter(offers));
      });
      activateMapFilters();
    })
    .catch((error) => {
      showFatal(error);
    });
};

const sendData = (onSuccess) => {
  offerForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    fetch(
      'https://23.javascript.pages.academy/keksobooking',
      {
        method: 'POST',
        body: formData,
      },
    )
      .then((response) => {
        if (response.ok) {
          onSuccess();
          resetForm();
          renderSimilarList(filter(data));
          renderPopupMessage('success');
        } else {
          renderPopupMessage('error');
        }
      })
      .catch(() => {
        renderPopupMessage('error');
      });
  });
};

sendData(resetForm);

export {getData};
