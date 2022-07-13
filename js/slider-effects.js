const effectsList = document.querySelector('.effects__list');
const sliderContainer = document.querySelector('.effect-level');
const imagePreview = document.querySelector('.img-upload__preview').querySelector('img');
const valueElement = document.querySelector('.effect-level__value');
const sliderElement = document.querySelector('.effect-level__slider');
const START_VALUE = 100;
const effects = {
  NONE: '',
  CHROME: 'grayscale',
  SEPIA: 'sepia',
  MARVIN: 'invert',
  PHOBOS: 'blur',
  HEAT: 'brightness'
};

const setEffectClass =(className) => {
  imagePreview.classList = '';
  imagePreview.classList.add(className);
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
let currentEffect = '';
let measure = '';

sliderElement.noUiSlider.on('update', (unencoded, handle) => {
  valueElement.setAttribute('value', unencoded[handle]);
  imagePreview.style.filter = `${currentEffect}(${unencoded[handle]}${measure})`;
});

effectsList.addEventListener('change', (evt) => {
  const target = evt.target;
  if(target && target.value === 'none') {
    imagePreview.style =  '';
    imagePreview.classList = '';
    sliderContainer.classList.add('hidden');

  } else if(target && target.value === 'chrome'){
    setEffectClass('effects__preview--chrome');
    currentEffect = effects.CHROME;
    measure = '';
    sliderElement.noUiSlider.updateOptions ({
      range: {
        min: 0,
        max: 1 ,
      },
      start: 1,
      step: 0.1,
    });
    sliderContainer.classList.remove('hidden');
  } else if(target && target.value === 'sepia'){
    setEffectClass('effects__preview--sepia');
    currentEffect = effects.SEPIA;
    measure = '';
    sliderElement.noUiSlider.updateOptions ({
      range: {
        min:0,
        max: 1 ,
      },
      start: 1,
      step: 0.1,
    });
    sliderContainer.classList.remove('hidden');
  } else if (target && target.value === 'marvin'){
    setEffectClass('effects__preview--marvin');
    currentEffect = effects.MARVIN;
    measure = '%';
    sliderElement.noUiSlider.updateOptions ({
      range: {
        min: 0,
        max: 100 ,
      },
      start: 100,
      step: 1,
    });
  } else if (target && target.value === 'phobos'){
    setEffectClass('effects__preview--phobos');
    currentEffect = effects.PHOBOS;
    measure = 'px';
    sliderElement.noUiSlider.updateOptions ({
      range: {
        min: 0,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
    sliderContainer.classList.remove('hidden');
  } else if (target && target.value === 'heat'){
    setEffectClass('effects__preview--heat');
    currentEffect = effects.HEAT;
    measure = '';
    sliderElement.noUiSlider.updateOptions ({
      range: {
        min: 1,
        max: 3,
      },
      start: 3,
      step: 0.1,
    });
    sliderContainer.classList.remove('hidden');
  }
  sliderElement.noUiSlider.set(START_VALUE);

});
