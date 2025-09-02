import { isEscapeKey } from './utils';
import { initFormValidation } from './form-validation';

const body = document.querySelector('body');
const imgUploadForm = body.querySelector('.img-upload__form');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');

const openForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', documentKeydownHandler);
  imgUploadCancel.addEventListener('click', imgUploadCancelHandler);
};

const closeForm = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', documentKeydownHandler);
  imgUploadCancel.removeEventListener('click', imgUploadCancelHandler);

  imgUploadForm.reset();
};

function documentKeydownHandler(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeForm();
  }
}

function imgUploadCancelHandler() {
  closeForm();
}

const initUploadForm = () => {
  imgUploadInput.addEventListener('change', openForm);
  initFormValidation();
};

export { initUploadForm };
