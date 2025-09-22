const EFFECTS = {
  none: {
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    filter: () => 'none',
    unit: '',
  },
  chrome: {
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    filter: (value) => `grayscale(${value})`,
    unit: '',
  },
  sepia: {
    range: { min: 0, max: 1 },
    start: 1,
    step: 0.1,
    filter: (value) => `sepia(${value})`,
    unit: '',
  },
  marvin: {
    range: { min: 0, max: 100 },
    start: 100,
    step: 1,
    filter: (value) => `invert(${value}%)`,
    unit: '%',
  },
  phobos: {
    range: { min: 0, max: 3 },
    start: 3,
    step: 0.1,
    filter: (value) => `blur(${value}px)`,
    unit: 'px',
  },
  heat: {
    range: { min: 1, max: 3 },
    start: 3,
    step: 0.1,
    filter: (value) => `brightness(${value})`,
    unit: '',
  },
};

const imgPreviewElement = document.querySelector('.img-upload__preview img');
const valueElement = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.effect-level__slider');
const effectLevelElement = document.querySelector('.img-upload__effect-level');
const effectsFieldsetElement = document.querySelector('.effects');

noUiSlider.create(sliderElement, {
  range: EFFECTS.none.range,
  start: EFFECTS.none.start,
  step: EFFECTS.none.step,
  connect: 'lower',
});

effectLevelElement.classList.add('hidden');

sliderElement.noUiSlider.on('update', (values, handle) => {
  const value = parseFloat(values[handle]);
  valueElement.value = value;
  const effect = document.querySelector('.effects__radio:checked').value;
  imgPreviewElement.style.filter =
    effect === 'none' ? '' : EFFECTS[effect].filter(values[handle]);
});

effectsFieldsetElement.addEventListener('change', (evt) => {
  const effect = EFFECTS[evt.target.value];

  if (evt.target.value === 'none') {
    imgPreviewElement.style.filter = 'none';
    effectLevelElement.classList.add('hidden');
  } else {
    effectLevelElement.classList.remove('hidden');

    sliderElement.noUiSlider.updateOptions({
      range: effect.range,
      start: effect.start,
      step: effect.step,
    });

    imgPreviewElement.style.filter = effect.filter(effect.start);
  }

  valueElement.value = effect.start;
});

const resetEffects = () => {
  const defaultEffect = EFFECTS.none;

  sliderElement.noUiSlider.updateOptions({
    range: defaultEffect.range,
    start: defaultEffect.start,
    step: defaultEffect.step,
  });

  imgPreviewElement.style.filter = 'none';
  effectLevelElement.classList.add('hidden');
};

export { resetEffects };
