import {renderSimilarList} from './map.js';

const SIMILAR_OFFER_COUNT = 10;

// Получение данных с сервера (метки объявлений)
fetch('https://23.javascript.pages.academy/keksobooking/data')
  .then((response) => response.json())
  .then((offers) => {
    console.log(offers);
    renderSimilarList(offers.slice(0, SIMILAR_OFFER_COUNT));
  });

