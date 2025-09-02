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

function validateDescription(value) {
  return value.length <= 140;
}

function validateHashtag(value) {
  if (!value) {
    return true;
  }

  const hashtags = value
    .trim()
    .split(/\s+/)
    .filter((tag) => tag.length > 0);

  if (hashtags.length > 5) {
    return false;
  }

  const lowercased = hashtags.map((tag) => tag.toLowerCase());
  const hasDuplicates = new Set(lowercased).size !== lowercased.length;

  if (hasDuplicates) {
    return false;
  }

  return hashtags.every((tag) => hashtagRegExp.test(tag));
}

pristine.addValidator(
  descriptionField,
  validateDescription,
  'Длина комментария не может составлять больше 140 символов',
);

pristine.addValidator(
  hashtagField,
  validateHashtag,
  'Некорректные хэштеги. Допустимо: до 5 шт., уникальные, формат #тег',
);

function initFormValidation() {
  imgUploadForm.addEventListener('submit', (evt) => {
    const isValid = pristine.validate();
    if (!isValid) {
      evt.preventDefault();
    }
  });
}

export { initFormValidation };
