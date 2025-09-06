import './utils.js';
import { photoDescriptions } from './data.js';
import { initGallery } from './gallery.js';
import { initUploadForm } from './upload-form.js';
import './upload-slider.js';

initGallery(photoDescriptions);
initUploadForm();
