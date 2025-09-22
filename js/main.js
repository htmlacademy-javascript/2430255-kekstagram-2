import './utils.js';
import { initGallery } from './gallery.js';
import { initUploadForm } from './upload-form.js';
import './upload-slider.js';
import { getData } from './api.js';
import { setupFilter } from './filter.js';
import { showDataErrorMessage } from './messages.js';

const initApp = async () => {
  try {
    const userPhotos = await getData();
    initGallery(userPhotos);
    setupFilter(userPhotos);
  } catch (err) {
    window.console.error('Ошибка загрузки данных:', err.message);

    showDataErrorMessage();
  }

  initUploadForm();
};

initApp();
