import { debounce } from './utils';
import { renderPhotos } from './photos-renderer';

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

const debounceRender = debounce(renderPhotos);

const applyFilter = () => {
  if (!filterElement) {
    return;
  }

  const activeButton = filterElement.querySelector(`.${ACTIVE_BUTTON_CLASS}`);
  const currentId = activeButton ? activeButton.id : FILTER_IDS.DEFAULT;

  let filtered = pictures.slice();

  if (currentId === FILTER_IDS.RANDOM) {
    filtered = filtered.sort(SORTFUNC.random).slice(0, MAX_PICTURE_COUNT);
  } else if (currentId === FILTER_IDS.DISCUSSED) {
    filtered = filtered.sort(SORTFUNC.discussed);
  }

  debounceRender(filtered);
};

const filterClickHandler = (evt) => {
  const button = evt.target.closest('button');
  if (!button || !filterElement.contains(button)) {
    return;
  }

  const activeButton = filterElement.querySelector(`.${ACTIVE_BUTTON_CLASS}`);
  if (activeButton === button) {
    return;
  }

  if (activeButton) {
    activeButton.classList.remove(ACTIVE_BUTTON_CLASS);
  }
  button.classList.add(ACTIVE_BUTTON_CLASS);

  applyFilter();
};

const configFilter = (picturesData) => {
  if (!filterElement) {
    return;
  }

  pictures = Array.isArray(picturesData) ? picturesData.slice() : [];

  filterElement.classList.remove('img-filters--inactive');

  const defaultButton = filterElement.querySelector(`#${FILTER_IDS.DEFAULT}`);
  if (defaultButton) {
    filterElement
      .querySelectorAll('button')
      .forEach((btn) => btn.classList.remove(ACTIVE_BUTTON_CLASS));
    defaultButton.classList.add(ACTIVE_BUTTON_CLASS);
  }

  filterElement.removeEventListener('click', filterClickHandler);
  filterElement.addEventListener('click', filterClickHandler);

  applyFilter();
};

export { configFilter };
