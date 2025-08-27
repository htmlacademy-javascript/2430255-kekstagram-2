import { renderPhotos, pictures } from './photos-renderer.js';
import { initFullSizeMode } from './fullsize-mode.js';

function initGallery(photos) {
  renderPhotos(photos);
  initFullSizeMode(photos, pictures);
}

export { initGallery };
