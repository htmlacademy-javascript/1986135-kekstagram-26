const effectsList = document.querySelector('.effects__list');
const sliderContainer = document.querySelector('.effect-level');
const imagePreview = document.querySelector('.img-upload__preview').querySelector('img');
const valueElement = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.effect-level__slider');

const EFFECT_NONE = 'none';
const EFFECTS_CONFIG = {
  NONE : '',
  CHROME: {
    sliderConfig: {
      range: {
        min: 0,
        max: 1,
      },
      start: 1,
      step: 0.1,
    },
    filter: 'grayscale',
    measure: '',
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
    measure: '',
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
    measure: 'px',
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
    measure: '',
  },
};

const setEffectClass = (className) => {
  imagePreview.classList = '';
  imagePreview.classList.add(className);
};

const setEffectFilter = (effectName) => {
  const {measure, filter} = EFFECTS_CONFIG[effectName];
  imagePreview.style.filter = `${filter}(${sliderElement.noUiSlider.get()}${measure})`;
};

const updateSlider = ({sliderConfig}) => {
  sliderContainer.classList.remove('hidden');
  sliderElement.noUiSlider.updateOptions(sliderConfig);
  sliderElement.noUiSlider.set(sliderConfig.start);
};

const resetEffectSetting = () => {
  imagePreview.classList = '';
  imagePreview.style.filter = '';
  sliderContainer.classList.add('hidden');
};

const onChangeEffectsList = (evt) => {
  const target = evt.target;
  if (target && target.value === EFFECT_NONE) {
    resetEffectSetting();
    return;
  }

  const effectName = target.value.toUpperCase();
  setEffectClass(`'effects__preview--${target.value}`);
  setEffectFilter(effectName);
  updateSlider(EFFECTS_CONFIG[effectName]);
  sliderContainer.classList.remove('hidden');
};

const setupEffects = () => {
  effectsList.addEventListener('change', onChangeEffectsList);
  noUiSlider.create(sliderElement, EFFECTS_CONFIG.CHROME.sliderConfig);

  sliderElement.noUiSlider.on('update', (unencoded, handle) => {
    valueElement.value = unencoded[handle];

    const effectName = effectsList.querySelector('input:checked').value.toUpperCase();
    setEffectFilter(effectName);
  });
};

const destroyEffects = () => {
  sliderElement.noUiSlider.destroy();
  resetEffectSetting();
};


export {setupEffects, destroyEffects};
