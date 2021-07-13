const typeFilter = document.querySelector('[name="housing-type"]');
const priceFilter = document.querySelector('[name="housing-price"]');
const roomsFilter = document.querySelector('[name="housing-rooms"]');
const guestsFilter = document.querySelector('[name="housing-guests"]');


const handleMessage = (select) => {
  for (let i = 0; i < select.options.length; i++) {
    if (select.options[i].selected) {
      select.options[i].setAttribute('selected', 'selected');
    }

    if (!select.options[i].selected) {
      select.options[i].removeAttribute('selected');
    }
  }
};

typeFilter.addEventListener('change', () => handleMessage(typeFilter));
priceFilter.addEventListener('change', () => handleMessage(priceFilter));
roomsFilter.addEventListener('change', () => handleMessage(roomsFilter));
guestsFilter.addEventListener('change', () => handleMessage(guestsFilter));

export {handleMessage};
