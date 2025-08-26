const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) =>
  elements[getRandomInteger(0, elements.length - 1)];

const generateUniqueNumbers = (count, startFrom = 1) => {
  const numbers = Array.from({ length: count }, (_, i) => i + startFrom);
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  return numbers;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export {
  getRandomInteger,
  getRandomArrayElement,
  generateUniqueNumbers,
  isEscapeKey,
};
