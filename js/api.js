import {renderSimilarList} from './map.js';
import {resetForm} from './form.js';

const SIMILAR_OFFER_COUNT = 10;
const ALERT_SHOW_TIME = 5000;

const offerForm = document.querySelector('.ad-form');
const body = document.querySelector('body');

const showFatal = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
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
      renderSimilarList(offers.slice(0, SIMILAR_OFFER_COUNT));
    })
    .catch((error) => {
      showFatal(error);
    });
};

getData();

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
