const ADVERT_COUNT = 10;
const AVATAR_MIN = 1;
const AVATAR_MAX = 10;
const LAT_MIN = 35.65000;
const LAT_MAX = 35.70000;
const LNG_MIN = 139.70000;
const LNG_MAX = 139.80000;
const DECIMAL_POINT = 5;
const TITLE = 'Милая, уютная квартирка в центре Токио';
const DESCRIPTION = 'Вашему вниманию представляется современная уютная квартира в престижном районе Токио';
const COST_MIN = 800;
const COST_MAX = 1200;
const TYPES = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const CHECKINS = [
  '12:00',
  '13:00',
  '14:00',
];
const CHECKOUTS = [
  '12:00',
  '13:00',
  '14:00',
];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const arrayOfAvatars = [];

const getRandomPositiveInteger = (min, max) => {
  // Чтобы не заставлять пользователя нашей функции помнить порядок аргументов,
  // реализуем поддержку передачи минимального и максимального значения в любом порядке,
  // а какое из них большее и меньшее вычислим с помощью Math.min и Math.max.

  // После нам нужно убедиться, что пользователь не передал дробные значения,
  // для этого на всякий пожарный случай нижнюю границу диапазона
  // мы округляем к ближайшему большему целому с помощью Math.ceil,
  // а верхнюю границу - к ближайшему меньшему целому с помощью Math.floor
  const lower = Math.ceil(Math.min(Math.abs(min), Math.abs(max)));
  const upper = Math.floor(Math.max(Math.abs(min), Math.abs(max)));
  // Обратите внимание, чтобы учесть условие, что диапазон может быть [0, ∞),
  // мы не ругаем пользователя за переданное отрицательное число,
  // а просто берём его по модулю с помощью Math.abs

  // Дальше используем Math.random() для получения случайного дробного числа в диапазоне [0, 1),
  // которое домножаем на разницу между переданными числами плюс единица - это будет наша случайная дельта.
  // После нужно сложить дельту с минимальным значением, чтобы получить итоговое случайное число.
  const result = Math.random() * (upper - lower + 1) + lower;
  // "Плюс единица", чтобы включить верхнюю границу диапазона в случайные числа

  // И в конце с помощью метода Math.floor мы округляем полученный результат,
  // потому что Math.random() генерирует только дробные числа и ноль.
  return Math.floor(result);
};

const getRandomPositiveFloat = (min, max, digits = 1) => {
  // Чтобы не заставлять пользователя нашей функции помнить порядок аргументов,
  // реализуем поддержку передачи минимального и максимального значения в любом порядке,
  // а какое из них большее и меньшее вычислим с помощью Math.min и Math.max
  const lower = Math.min(Math.abs(min), Math.abs(max));
  const upper = Math.max(Math.abs(min), Math.abs(max));
  // Обратите внимание, чтобы учесть условие, что диапазон может быть [0, ∞),
  // мы не ругаем пользователя за переданное отрицательное число,
  // а просто берём его по модулю с помощью Math.abs

  // Дальше используем Math.random() для получения случайного дробного числа в диапазоне [0, 1),
  // которое домножаем на разницу между переданными числами - это будет наша случайная дельта.
  // После нужно сложить дельту с минимальным значением, чтобы получить итоговое случайное число.
  const result = Math.random() * (upper - lower) + lower;

  // И в конце с помощью метода toFixed любого числа в JavaScript
  // указать требуемое количество знаков после точки
  return +result.toFixed(digits);
};

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const getNewArrayElements = (elements) => {
  const arrayOfElements = elements.slice(getRandomPositiveInteger(0, elements.length - 1));
  return arrayOfElements;
};

for (let i = AVATAR_MIN; i <= AVATAR_MAX; i++) {
  const str = `img/avatars/user${i < AVATAR_MAX ? `0${i}` : `${i}`}.png `;
  arrayOfAvatars.push(str);
}

const generateLocation = () => {
  return {
    lat: getRandomPositiveFloat(LAT_MIN, LAT_MAX, DECIMAL_POINT),
    lng: getRandomPositiveFloat(LNG_MIN, LNG_MAX, DECIMAL_POINT),
  };
};

const generateOffer = () => {
  const coordinates = generateLocation();

  return {
    author: {
      avatar: arrayOfAvatars.shift(),
    },
    offer: {
      title: TITLE,
      address: `${coordinates.lat}, ${coordinates.lng}`,
      price: getRandomPositiveInteger(COST_MIN, COST_MAX),
      type: getRandomArrayElement(TYPES),
      rooms: getRandomPositiveInteger(1, 5),
      guests: getRandomPositiveInteger(1, 10),
      checkin: getRandomArrayElement(CHECKINS),
      checkout: getRandomArrayElement(CHECKOUTS),
      features: getNewArrayElements(FEATURES),
      description: DESCRIPTION,
      photos: getNewArrayElements(PHOTOS),
    },
    location: {
      lat: coordinates.lat,
      lng: coordinates.lng,
    },
  };
};

new Array(ADVERT_COUNT).fill().map(() => generateOffer());
