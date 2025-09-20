import { renderPhotos, photosContainerElement } from './photos-renderer.js';
import { initFullSizeMode } from './fullsize-mode.js';

const initGallery = (photos) => {
  renderPhotos(photos);
  initFullSizeMode(photos, photosContainerElement);
};

export { initGallery };
