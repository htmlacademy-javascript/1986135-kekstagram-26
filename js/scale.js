const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const SCALE_STEP = 25;

const scaleContainer = document.querySelector('.scale');
const scaleControlSmaller = scaleContainer.querySelector('.scale__control--smaller');
const scaleControlBigger = scaleContainer.querySelector('.scale__control--bigger');
const scaleValue = scaleContainer.querySelector('.scale__control--value');
const imagePreview = document.querySelector('.img-upload__preview').querySelector('img');

const setScaleValue = (currentValue, step, canChange) => {
  if (!canChange) {
    return;
  }
  currentValue = currentValue + step;
  scaleValue.value = `${currentValue}%`;
  imagePreview.style.transform = `scale(${currentValue / 100})`;
};

const onButtonScaleDecrease = () => {
  const currentValue = parseInt(scaleValue.value, 10);
  setScaleValue(currentValue, -SCALE_STEP, currentValue > MIN_SCALE_VALUE);
};

const onButtonScaleIncrease = () => {
  const currentValue = parseInt(scaleValue.value, 10);
  setScaleValue(currentValue, SCALE_STEP, currentValue < MAX_SCALE_VALUE);
};

const changeScale = () => {
  scaleControlSmaller.addEventListener('click', onButtonScaleDecrease);
  scaleControlBigger.addEventListener('click', onButtonScaleIncrease);
};

const resetScale = ()=> {
  imagePreview.style.transform = '';
  scaleValue.value = `${MAX_SCALE_VALUE}%`;
};

const removeScale = () => {
  scaleControlSmaller.removeEventListener('click', onButtonScaleDecrease);
  scaleControlBigger.removeEventListener('click', onButtonScaleIncrease);
};

export {resetScale, changeScale, removeScale};
