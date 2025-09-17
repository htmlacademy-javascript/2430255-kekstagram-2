import './utils.js';
import { initGallery } from './gallery.js';
import { initUploadForm } from './upload-form.js';
import './upload-slider.js';
import { getData } from './api.js';

const initApp = async () => {
  try {
    const userPhotos = await getData();
    initGallery(userPhotos);
  } catch (err) {
    window.console.error('Ошибка загрузки данных:', err.message);
  }

  initUploadForm();
};

initApp();
