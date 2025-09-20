import { isEscapeKey } from './utils.js';
import { initFormValidation } from './form-validation.js';
import { resetEffects } from './upload-slider.js';
import { initScale, resetScale, destroyScale } from './upload-scale.js';
import { sendData } from './api.js';
import { showSuccessMessage, showErrorMessage } from './messages.js';
import { FILE_TYPES } from './const.js';

const bodyElement = document.querySelector('body');
const imgUploadFormElement = bodyElement.querySelector('.img-upload__form');
const imgUploadOverlayElement = imgUploadFormElement.querySelector(
  '.img-upload__overlay',
);
const imgUploadInputElement =
  imgUploadFormElement.querySelector('.img-upload__input');
const imgUploadCancelElement = imgUploadOverlayElement.querySelector(
  '.img-upload__cancel',
);
const imgPreviewElement = imgUploadOverlayElement.querySelector(
  '.img-upload__preview img',
);
const defaultPreviewSrc = imgPreviewElement.src;
const submitButtonElement = imgUploadFormElement.querySelector(
  '.img-upload__submit',
);

const pristine = initFormValidation();

const SubmitButtonText = {
  IDLE: 'Опубликовать',
  SENDING: 'Публикую...',
};

const toggleSubmitButton = (isDisabled) => {
  submitButtonElement.disabled = isDisabled;
  submitButtonElement.textContent = isDisabled
    ? SubmitButtonText.SENDING
    : SubmitButtonText.IDLE;
};

const addDocumentKeydownHandler = () => {
  document.addEventListener('keydown', documentKeydownHandler);
};

const removeDocumentKeydownHandler = () => {
  document.removeEventListener('keydown', documentKeydownHandler);
};

const closeUploadOverlay = () => {
  imgUploadOverlayElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');
  removeDocumentKeydownHandler();
  imgUploadCancelElement.removeEventListener('click', imgUploadCancelHandler);
  imgUploadFormElement.reset();
  imgUploadInputElement.value = '';
  imgPreviewElement.src = defaultPreviewSrc;
  resetEffects();
  resetScale();
  pristine.reset();
  destroyScale();
  toggleSubmitButton(false);
};

const openUploadOverlay = () => {
  imgUploadOverlayElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');
  pristine.reset();
  toggleSubmitButton(false);
  addDocumentKeydownHandler();
  imgUploadCancelElement.addEventListener('click', imgUploadCancelHandler);
  initScale();
};

function documentKeydownHandler(evt) {
  if (
    isEscapeKey(evt) &&
    !evt.target.closest('.text__hashtags') &&
    !evt.target.closest('.text__description')
  ) {
    evt.preventDefault();
    closeUploadOverlay();
  }
}

function imgUploadCancelHandler() {
  closeUploadOverlay();
}

function imgUploadInputChangeHandler() {
  const file = imgUploadInputElement.files[0];
  if (!file) {
    return;
  }

  const fileName = file.name.toLowerCase();
  const isValidType = FILE_TYPES.some((ext) => fileName.endsWith(ext));

  if (isValidType) {
    imgPreviewElement.src = URL.createObjectURL(file);
    openUploadOverlay();
  } else {
    imgUploadInputElement.value = '';
  }
}

const initUploadForm = () => {
  imgUploadInputElement.addEventListener('change', imgUploadInputChangeHandler);

  imgUploadFormElement.addEventListener('submit', async (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (!isValid) {
      return;
    }

    toggleSubmitButton(true);
    const formData = new FormData(evt.target);

    try {
      await sendData(formData);
      closeUploadOverlay();
      showSuccessMessage();
    } catch (err) {
      showErrorMessage({
        onOpen: removeDocumentKeydownHandler,
        onClose: addDocumentKeydownHandler,
      });
    } finally {
      toggleSubmitButton(false);
    }
  });
};

export {
  initUploadForm,
  addDocumentKeydownHandler,
  removeDocumentKeydownHandler,
  closeUploadOverlay,
};
