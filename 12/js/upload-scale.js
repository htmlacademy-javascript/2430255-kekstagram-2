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

const changeScale = (direction) => {
  const currentValue = parseInt(scaleValue.value, 10);
  const newValue = currentValue + SCALE_STEP * direction;

  if (newValue >= SCALE_MIN && newValue <= SCALE_MAX) {
    applyScale(newValue);
  }
};

const scaleButtonClickHandler = (evt) => {
  if (evt.target.classList.contains('scale__control--bigger')) {
    changeScale(1);
  } else if (evt.target.classList.contains('scale__control--smaller')) {
    changeScale(-1);
  }
};

const resetScale = () => applyScale(SCALE_DEFAULT);

const initScale = () => {
  applyScale(SCALE_DEFAULT);
  smallerButton.addEventListener('click', scaleButtonClickHandler);
  biggerButton.addEventListener('click', scaleButtonClickHandler);
};

export { initScale, resetScale };
