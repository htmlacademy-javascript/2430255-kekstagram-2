const imgUploadForm = document.querySelector('.img-upload__form');

const pristine = new Pristine(imgUploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'img-upload__field-wrapper--error',
  successClass: 'img-upload__field-wrapper--success',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'form__error',
});

const hashtagRegExp = /^#[a-zа-яё0-9]{1,19}$/i;

const hashtagField = imgUploadForm.querySelector('.text__hashtags');
const descriptionField = imgUploadForm.querySelector('.text__description');

const getHashtags = (value) =>
  value
    .trim()
    .split(/\s+/)
    .filter((tag) => tag.length > 0);

const validateDescription = (value) => value.length <= 140;

pristine.addValidator(
  descriptionField,
  validateDescription,
  'Длина комментария не может составлять больше 140 символов',
);

const validateHashtagFormat = (value) => {
  if (!value) {
    return true;
  }
  return getHashtags(value).every((tag) => hashtagRegExp.test(tag));
};

const validateHashtagCount = (value) => {
  if (!value) {
    return true;
  }
  return getHashtags(value).length <= 5;
};

const validateHashtagUnique = (value) => {
  if (!value) {
    return true;
  }
  const hashtags = getHashtags(value).map((tag) => tag.toLowerCase());
  return new Set(hashtags).size === hashtags.length;
};

pristine.addValidator(
  hashtagField,
  validateHashtagFormat,
  'Хэштег должен начинаться с # и содержать до 20 символов: буквы и цифры',
);

pristine.addValidator(
  hashtagField,
  validateHashtagCount,
  'Нельзя указать больше пяти хэштегов',
);

pristine.addValidator(
  hashtagField,
  validateHashtagUnique,
  'Хэштеги не должны повторяться',
);

const initFormValidation = () => {
  imgUploadForm.addEventListener('submit', (evt) => {
    const isValid = pristine.validate();
    if (!isValid) {
      evt.preventDefault();
    }
  });
};

export { initFormValidation };
