const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;

const titleInput = document.querySelector('#title');
const priceInput = document.querySelector('#price');
const roomNumberSelect = document.querySelector('#room_number');
const capacitySelect = document.querySelector('#capacity');

titleInput.addEventListener('input', () => {
  const titleValueLength = titleInput.value.length;

  if (titleValueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Заголовок должен состоять минимум из ${MIN_TITLE_LENGTH} символов. Осталось ${MIN_TITLE_LENGTH - titleValueLength}.`);
  } else if (titleValueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Заголовок не должен превышать ${MAX_TITLE_LENGTH} символов.`);
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
});

priceInput.addEventListener('input', () => {
  const priceValue = priceInput.value;

  if (priceValue > MAX_PRICE) {
    priceInput.setCustomValidity(`Цена не должна превышать ${MAX_PRICE}.`);
  } else {
    priceInput.setCustomValidity('');
  }

  priceInput.reportValidity();
});

const checkValidCapacity = () => {
  if (roomNumberSelect.options[0].selected && !capacitySelect.options[2].selected) {
    capacitySelect.setCustomValidity('Следует выбрать «для 1 гостя»');
  } else if (roomNumberSelect.options[1].selected && !capacitySelect.options[1].selected && !capacitySelect.options[2].selected) {
    capacitySelect.setCustomValidity('Следует выбрать «для 2 гостей» или «для 1 гостя»');
  } else if (roomNumberSelect.options[2].selected && capacitySelect.options[3].selected) {
    capacitySelect.setCustomValidity('Следует выбрать «для 3 гостей», «для 2 гостей» или «для 1 гостя»');
  } else if (roomNumberSelect.options[3].selected && !capacitySelect.options[3].selected) {
    capacitySelect.setCustomValidity('Следует выбрать «не для гостей»');
  } else {
    capacitySelect.setCustomValidity('');
  }
};

checkValidCapacity();

capacitySelect.addEventListener('change', () => {
  checkValidCapacity();

  capacitySelect.reportValidity();
});

roomNumberSelect.addEventListener('change', () => {
  checkValidCapacity();

  capacitySelect.reportValidity();
});
