import { DEBOUNCE_DELAY } from './const';

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

const generateUniqueNumbers = (count, startFrom = 1) =>
  Array.from({ length: count }, (_, i) => i + startFrom);

const isEscapeKey = (evt) => evt.key === 'Escape';

function debounce(callback, timeoutDelay = DEBOUNCE_DELAY) {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
}

export {
  getRandomInteger,
  getRandomArrayElement,
  generateUniqueNumbers,
  isEscapeKey,
  debounce,
};
