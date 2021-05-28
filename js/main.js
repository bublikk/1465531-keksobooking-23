// Функция, возвращающая случайное целое число из переданного диапазона включительно

export const getRandomInteger = (min, max) => min >= 0 && max > min ? Math.floor(min + Math.random() * (max + 1 - min)) : -1;

// Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно

export const getRandomFloat = (min, max, point) => {
  if (min >= 0 && max > min && point > 0) {
    const rand = min + Math.random() * (max - min);
    return rand.toFixed(point);
  }
  return -1;
};
