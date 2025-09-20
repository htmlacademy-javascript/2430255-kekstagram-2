export const EFFECTS = {
  none: {
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    filter: () => 'none',
    unit: '',
  },
  chrome: {
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    filter: (value) => `grayscale(${value})`,
    unit: '',
  },
  sepia: {
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    filter: (value) => `sepia(${value})`,
    unit: '',
  },
  marvin: {
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    filter: (value) => `invert(${value}%)`,
    unit: '%',
  },
  phobos: {
    range: { min: 0, max: 3 },
    start: 3,
    step: 0.1,
    filter: (value) => `blur(${value}px)`,
    unit: 'px',
  },
  heat: {
    range: { min: 1, max: 3 },
    start: 3,
    step: 0.1,
    filter: (value) => `brightness(${value})`,
    unit: '',
  },
};

export const FILTER_IDS = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

export const SORTFUNC = {
  random: () => 0.5 - Math.random(),
  discussed: (a, b) => b.comments.length - a.comments.length,
};

export const DEBOUNCE_DELAY = 500;
export const MAX_PICTURE_COUNT = 10;
export const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';

export const MAX_DESCRIPTION_LENGTH = 140;
export const MAX_HASHTAGS_COUNT = 5;
export const MAX_HASHTAG_LENGTH = 20;

export const FILE_TYPES = ['jpg', 'jpeg', 'png'];

export const SCALE_STEP = 25;
export const SCALE_MIN = 25;
export const SCALE_MAX = 100;
export const SCALE_DEFAULT = 100;

export const COMMENTS_PER_PAGE = 5;

export const BASE_URL = 'https://31.javascript.htmlacademy.pro/kekstagram';
