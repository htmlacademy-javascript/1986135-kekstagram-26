const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const SCALE_STEP = 25;

const scaleContainer = document.querySelector('.scale');
const scaleControlSmaller = scaleContainer.querySelector('.scale__control--smaller');
const scaleControlBigger = scaleContainer.querySelector('.scale__control--bigger');
const scaleValue = scaleContainer.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview').querySelector('img');

const setScaleValue = (currentValue) => {
  const newValue = currentValue /100;
  imagePreview.style.transform = `scale(${newValue })`;
};

const decreaseScale = () => {
  let currentValue = parseInt(scaleValue.value, 10);
  if (currentValue > MIN_SCALE_VALUE) {
    currentValue = currentValue - SCALE_STEP;
  }
  return currentValue;
};

const increaseScale = () => {
  let currentValue = parseInt(scaleValue.value, 10);
  if (currentValue < MAX_SCALE_VALUE) {
    currentValue = currentValue + SCALE_STEP;
  }
  return currentValue;
};

const onButtonScaleDecrease = () => {
  const currentValue = decreaseScale();
  scaleValue.setAttribute('value',`${currentValue  }%`);
  setScaleValue(currentValue);
};

const onButtonScaleIncrease = () => {
  const currentValue = increaseScale();
  scaleValue.setAttribute('value',`${currentValue  }%`);
  setScaleValue(currentValue);
};

const resetScale = ()=> {
  imagePreview.style.transform = '';
  scaleValue.setAttribute('value', `${MAX_SCALE_VALUE}%`);
};


export {resetScale, scaleControlSmaller, scaleControlBigger, onButtonScaleDecrease, onButtonScaleIncrease};
