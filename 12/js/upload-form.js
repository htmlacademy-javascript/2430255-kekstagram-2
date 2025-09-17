import { isEscapeKey } from './utils.js';
import { initFormValidation } from './form-validation.js';
import { resetEffects } from './upload-slider.js';
import { initScale, resetScale } from './upload-scale.js';
import { sendData } from './api.js';
import { showErrorMessage, showSuccessMessage } from './messages.js';

const body = document.querySelector('body');
const imgUploadForm = body.querySelector('.img-upload__form');
const imgUploadOverlay = imgUploadForm.querySelector('.img-upload__overlay');
const imgUploadInput = imgUploadForm.querySelector('.img-upload__input');
const imgUploadCancel = imgUploadForm.querySelector('.img-upload__cancel');
const submitButton = imgUploadForm.querySelector('.img-upload__submit');

const pristine = initFormValidation();

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...',
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = SubmitButtonText.SENDING;
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = SubmitButtonText.IDLE;
};

const openForm = () => {
  imgUploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', documentKeydownHandler);
  imgUploadCancel.addEventListener('click', imgUploadCancelHandler);

  initScale();
};

const closeForm = () => {
  imgUploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', documentKeydownHandler);
  imgUploadCancel.removeEventListener('click', imgUploadCancelHandler);

  imgUploadForm.reset();
  resetEffects();
  resetScale();
  pristine.reset();
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

  imgUploadForm.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    if (!pristine.validate()) {
      return;
    }

    blockSubmitButton();

    const formData = new FormData(evt.target);

    try {
      await sendData(formData);
      closeForm();
      showSuccessMessage();
    } catch (error) {
      showErrorMessage();
    } finally {
      unblockSubmitButton();
    }
  });
};

export { initUploadForm };
