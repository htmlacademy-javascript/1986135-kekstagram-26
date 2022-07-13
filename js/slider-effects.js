import { resetScale } from './scale.js';

const START_VALUE = 100;
const effectsList = document.querySelector('.effects__list');
const sliderContainer = document.querySelector('.effect-level');
const imagePreview = document.querySelector('.img-upload__preview').querySelector('img');
const valueElement = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.effect-level__slider');
const EFFECTS_CONFIG = {
  NONE: '',
  CHROME:{
    sliderConfig: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    filter: 'grayscale',
  },
  SEPIA: {
    sliderConfig: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    filter: 'sepia',
  },
  MARVIN: {
    sliderConfig: {
      range: {
        min: 0,
        max: 100,
      },
      start: 100,
      step: 1,
    },
    filter: 'invert',
    measure: '%',
  },
  PHOBOS: {
    sliderConfig: {
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    filter: 'blur',
    effectMeasure: 'px',
  },
  HEAT: {
    sliderConfig: {
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    },
    filter: 'brightness',
  },
};

let currentEffect = '';
let measure = '';

const setEffectClass =(className) => {
  imagePreview.classList = '';
  imagePreview.classList.add(className);
};

const updateEffectSetting =({sliderConfig, filter, effectMeasure}, startValue)=> {
  currentEffect = filter;
  measure = effectMeasure;
  const {range: {min, max}, start, step} = sliderConfig;
  sliderElement.noUiSlider.updateOptions({
    range: {
      min: min,
      max: max,
    },
    start: start,
    step: step,
  });
  sliderElement.noUiSlider.set(startValue);
};

const resetEffectSetting =() => {
  imagePreview.classList = '';
  imagePreview.style.filter = '';
  updateEffectSetting(EFFECTS_CONFIG.NONE, START_VALUE);
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 1,
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', (unencoded, handle) => {
  valueElement.setAttribute('value', unencoded[handle]);
  imagePreview.style.filter = `${currentEffect}(${unencoded[handle]}${measure})`;
});

const onChangeEffectsList =(evt)=> {
  resetScale();
  const target = evt.target;
  if(target && target.value === 'none') {
    resetEffectSetting();
    sliderContainer.classList.add('hidden');
  } else if(target && target.value === 'chrome'){
    setEffectClass('effects__preview--chrome');
    updateEffectSetting(EFFECTS_CONFIG.CHROME, START_VALUE);
    sliderContainer.classList.remove('hidden');
  } else if(target && target.value === 'sepia'){
    setEffectClass('effects__preview--sepia');
    updateEffectSetting(EFFECTS_CONFIG.SEPIA, START_VALUE);
    sliderContainer.classList.remove('hidden');
  } else if (target && target.value === 'marvin'){
    setEffectClass('effects__preview--marvin');
    updateEffectSetting(EFFECTS_CONFIG.MARVIN, START_VALUE);
  } else if (target && target.value === 'phobos'){
    setEffectClass('effects__preview--phobos');
    updateEffectSetting(EFFECTS_CONFIG.PHOBOS, START_VALUE);
    sliderContainer.classList.remove('hidden');
  } else if (target && target.value === 'heat'){
    setEffectClass('effects__preview--heat');
    updateEffectSetting(EFFECTS_CONFIG.HEAT, START_VALUE);
    sliderContainer.classList.remove('hidden');
  }
};

effectsList.addEventListener('change', onChangeEffectsList);

export {resetEffectSetting, effectsList, onChangeEffectsList};
