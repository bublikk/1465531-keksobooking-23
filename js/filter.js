const housingTypeSelect = document.querySelector('#housing-type');
const housingRoomSelect = document.querySelector('#housing-rooms');
const housingPriceSelect = document.querySelector('#housing-price');

const filterByPrice = (item) => {
  switch (housingPriceSelect.value) {
    case 'middle':
      return item.offer.price >= 10000 && item.offer.price <= 50000;

    case 'low':
      return item.offer.price < 10000;

    case 'high':
      return item.offer.price > 50000;

    default:
      return true;
  }
};

const filter = (data) => data.filter((item) => (housingTypeSelect.value === 'any' || item.offer.type === housingTypeSelect.value)
  && (housingRoomSelect.value === 'any' || item.offer.rooms === +housingRoomSelect.value)
  && filterByPrice(item));

export {filter};
