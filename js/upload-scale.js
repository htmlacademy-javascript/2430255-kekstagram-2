const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_DEFAULT = 100;

const smallerButton = document.querySelector('.scale__control--smaller');
const biggerButton = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview img');

const applyScale = (value) => {
  imgPreview.style.transform = `scale(${value / 100})`;
  scaleValue.value = `${value}%`;
};

const biggerButtonClickHandler = () => {
  let currentValue = parseInt(scaleValue.value, 10);
  if (currentValue < SCALE_MAX) {
    currentValue += SCALE_STEP;
    applyScale(currentValue);
  }
};

const smallerButtonClickHandler = () => {
  let currentValue = parseInt(scaleValue.value, 10);
  if (currentValue > SCALE_MIN) {
    currentValue -= SCALE_STEP;
    applyScale(currentValue);
  }
};

const resetScale = () => applyScale(SCALE_DEFAULT);

const initScale = () => {
  applyScale(SCALE_DEFAULT);
  smallerButton.addEventListener('click', smallerButtonClickHandler);
  biggerButton.addEventListener('click', biggerButtonClickHandler);
};

export { initScale, resetScale };
