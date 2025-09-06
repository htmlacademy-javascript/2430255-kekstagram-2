const imgPreview = document.querySelector('.img-upload__preview img');
const valueElement = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.effect-level__slider');
const effects = document.querySelectorAll('.effects__item');
const effectLevel = document.querySelector('.img-upload__effect-level');

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

noUiSlider.create(sliderElement, {
  range: EFFECTS.none.range,
  start: EFFECTS.none.start,
  step: EFFECTS.none.step,
  connect: 'lower',
});

effectLevel.classList.add('hidden');

sliderElement.noUiSlider.on('update', (values, handle) => {
  valueElement.value = values[handle];
  const effect = document.querySelector('.effects__radio:checked').value;

  if (effect === 'none') {
    imgPreview.style.filter = 'none';
    return;
  }

  imgPreview.style.filter = EFFECTS[effect].filter(values[handle]);
});

effects.forEach((effectInput) => {
  effectInput.addEventListener('change', (evt) => {
    const effect = EFFECTS[evt.target.value];

    if (evt.target.value === 'none') {
      imgPreview.style.filter = 'none';
      effectLevel.classList.add('hidden');
    } else {
      effectLevel.classList.remove('hidden');

      sliderElement.noUiSlider.updateOptions({
        range: effect.range,
        start: effect.start,
        step: effect.step,
      });

      imgPreview.style.filter = effect.filter(effect.start);
    }

    valueElement.value = effect.start;
  });
});
