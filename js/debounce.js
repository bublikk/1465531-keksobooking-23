const DELAY_DEFAULT = 500;

const debounce = (callback, timeoutDelay = DELAY_DEFAULT) => {
  let timeoutId;

  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {debounce};
