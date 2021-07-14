const houseFilter = document.querySelector('#housing-type');
const roomFilter = document.querySelector('#housing-rooms');
const priceFilter = document.querySelector('#housing-price');
const guestFilter = document.querySelector('#housing-guests');

const wifiFilter = document.querySelector('#filter-wifi');
const dishwasherFilter = document.querySelector('#filter-dishwasher');
const parkingFilter = document.querySelector('#filter-parking');
const washerFilter = document.querySelector('#filter-washer');
const elevatorFilter = document.querySelector('#filter-elevator');
const conditionerFilter = document.querySelector('#filter-conditioner');


const filterByPrice = (item) => {
  switch (priceFilter.value) {
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

const getFeaturesRank = (item) => {
  let rank = 0;

  if (item.offer.features !== undefined) {
    if (item.offer.features.includes(wifiFilter.value)) {
      rank += 1;
    }
    if (item.offer.features.includes(dishwasherFilter.value)) {
      rank += 1;
    }
    if (item.offer.features.includes(parkingFilter.value)) {
      rank += 1;
    }
    if (item.offer.features.includes(washerFilter.value)) {
      rank += 1;
    }
    if (item.offer.features.includes(elevatorFilter.value)) {
      rank += 1;
    }
    if (item.offer.features.includes(conditionerFilter.value)) {
      rank += 1;
    }
  }

  return rank;
};

const compareByFeaturesRank = (itemA, itemB) => {
  const rankA = getFeaturesRank(itemA);
  const rankB = getFeaturesRank(itemB);

  return rankB - rankA;
};

const filter = (data) =>
  data
    .slice()
    .sort(compareByFeaturesRank)
    .filter((item) => (houseFilter.value === 'any' || item.offer.type === houseFilter.value)
    && (roomFilter.value === 'any' || item.offer.rooms === +roomFilter.value)
    && filterByPrice(item)
    && (guestFilter.value === 'any' || item.offer.guests === +guestFilter.value));

export {filter};
