import { SCALE_STEP, SCALE_MIN, SCALE_MAX, SCALE_DEFAULT } from './const';

const smallerButtonElement = document.querySelector('.scale__control--smaller');
const biggerButtonElement = document.querySelector('.scale__control--bigger');
const scaleValueElement = document.querySelector('.scale__control--value');
const imgPreviewElement = document.querySelector('.img-upload__preview img');

const applyScale = (value) => {
  imgPreviewElement.style.transform = `scale(${value / 100})`;
  scaleValueElement.value = `${value}%`;
};

const changeScale = (direction) => {
  const currentValue = parseInt(scaleValueElement.value, 10);
  const newValue = currentValue + SCALE_STEP * direction;

  if (newValue >= SCALE_MIN && newValue <= SCALE_MAX) {
    applyScale(newValue);
  }
};

const biggerButtonClickHandler = () => changeScale(1);
const smallerButtonClickHandler = () => changeScale(-1);

const resetScale = () => applyScale(SCALE_DEFAULT);

const initScale = () => {
  applyScale(SCALE_DEFAULT);
  smallerButtonElement.addEventListener('click', smallerButtonClickHandler);
  biggerButtonElement.addEventListener('click', biggerButtonClickHandler);
};

const destroyScale = () => {
  smallerButtonElement.removeEventListener('click', smallerButtonClickHandler);
  biggerButtonElement.removeEventListener('click', biggerButtonClickHandler);
};

export { initScale, destroyScale, resetScale };
