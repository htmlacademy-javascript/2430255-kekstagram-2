import { EFFECTS } from './const';

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
  valueElement.value = values[handle];
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
