import { debounce } from './utils.js';
import { renderPhotos } from './photos-renderer.js';

const FILTER_IDS = {
  DEFAULT: 'filter-default',
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed',
};

const SORTFUNC = {
  random: () => 0.5 - Math.random(),
  discussed: (a, b) => b.comments.length - a.comments.length,
};

const MAX_PICTURE_COUNT = 10;
const ACTIVE_BUTTON_CLASS = 'img-filters__button--active';

const filterElement = document.querySelector('.img-filters');
let pictures = [];
let activeButtonElement = null;

const debounceRender = debounce(renderPhotos);

const applyFilter = () => {
  if (!filterElement || !activeButtonElement) {
    return;
  }

  const currentId = activeButtonElement.id;
  let filtered = pictures.slice();

  if (currentId === FILTER_IDS.RANDOM) {
    filtered = filtered.sort(SORTFUNC.random).slice(0, MAX_PICTURE_COUNT);
  } else if (currentId === FILTER_IDS.DISCUSSED) {
    filtered = filtered.sort(SORTFUNC.discussed);
  }

  debounceRender(filtered);
};

const filterClickHandler = (evt) => {
  const buttonElement = evt.target.closest('button');
  if (!buttonElement || !filterElement.contains(buttonElement)) {
    return;
  }

  if (activeButtonElement === buttonElement) {
    return;
  }

  if (activeButtonElement) {
    activeButtonElement.classList.remove(ACTIVE_BUTTON_CLASS);
  }
  buttonElement.classList.add(ACTIVE_BUTTON_CLASS);
  activeButtonElement = buttonElement;

  applyFilter();
};

const configFilter = (picturesData) => {
  if (!filterElement) {
    return;
  }

  pictures = Array.isArray(picturesData) ? picturesData.slice() : [];

  filterElement.classList.remove('img-filters--inactive');

  const defaultButtonElement = filterElement.querySelector(
    `#${FILTER_IDS.DEFAULT}`,
  );
  if (defaultButtonElement) {
    filterElement
      .querySelectorAll('button')
      .forEach((btn) => btn.classList.remove(ACTIVE_BUTTON_CLASS));
    defaultButtonElement.classList.add(ACTIVE_BUTTON_CLASS);
    activeButtonElement = defaultButtonElement;
  }

  filterElement.addEventListener('click', filterClickHandler);

  applyFilter();
};

export { configFilter };
