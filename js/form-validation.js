const MAX_DESCRIPTION_LENGTH = 140;
const MAX_HASHTAGS_COUNT = 5;
const MAX_HASHTAG_LENGTH = 20;

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

const validateDescription = (value) => value.length <= MAX_DESCRIPTION_LENGTH;

const validateHashtags = (value) => {
  if (!value) {
    return true;
  }

  const hashtags = getHashtags(value);

  if (hashtags.length > MAX_HASHTAGS_COUNT) {
    return false;
  }

  if (!hashtags.every((tag) => hashtagRegExp.test(tag))) {
    return false;
  }

  const lowerCaseTags = hashtags.map((tag) => tag.toLowerCase());

  return new Set(lowerCaseTags).size === lowerCaseTags.length;
};

const getHashtagsErrorMessage = (value) => {
  const hashtags = getHashtags(value);

  if (hashtags.length > MAX_HASHTAGS_COUNT) {
    return `Нельзя указать больше ${MAX_HASHTAGS_COUNT} хэштегов`;
  }

  if (!hashtags.every((tag) => hashtagRegExp.test(tag))) {
    return `Хэштег должен начинаться с # и содержать до ${MAX_HASHTAG_LENGTH} символов: буквы и цифры`;
  }

  const lowerCaseTags = hashtags.map((tag) => tag.toLowerCase());
  if (new Set(lowerCaseTags).size !== lowerCaseTags.length) {
    return 'Хэштеги не должны повторяться';
  }

  return true;
};

pristine.addValidator(
  descriptionField,
  validateDescription,
  `Длина комментария не может составлять больше ${MAX_DESCRIPTION_LENGTH} символов`,
);

pristine.addValidator(hashtagField, validateHashtags, getHashtagsErrorMessage);

const initFormValidation = () => pristine;

export { initFormValidation };
