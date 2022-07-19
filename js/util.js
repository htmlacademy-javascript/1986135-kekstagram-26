const ALERT_SHOW_TIME = 6000;

// Функция, возвращающая случ.число из диапазона включительно(из MDN)
const getRandomFromRangeInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  if(min < 0, max < 0){
    throw new RangeError('Параметр должен быть больше или равным нулю');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
getRandomFromRangeInclusive();

const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//проверка длины строки
// const checkStringLength = (string, maxStringLength) => string.length <= maxStringLength;
// checkStringLength ();

//создает уникальный массив чисел
const getUniqueId = (numberOfDigits) => {
  const numbersUniqueId = [];
  const getNumber = ()=>{
    const number = getRandomPositiveInteger(1,numberOfDigits);
    if (numbersUniqueId.includes(number)){
      getNumber();
    } else {
      numbersUniqueId.push(number);
    }
  };
  for (let i = 0; i < numberOfDigits; i++){
    getNumber();
  }
  return numbersUniqueId;
};

//случайный элемент из массива
const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];

const isEscapeKey = (evt) =>  evt.key === 'Escape';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '50px';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '40px';
  alertContainer.style.fontSize = '40px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#ccc492';
  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const shuffleArray = (arr) => {
  const copyArray = arr.slice(0, arr.length-1);
  for (let i = copyArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copyArray[i], copyArray[j]] = [copyArray[j], copyArray[i]];
  }
  return copyArray;
};

export {getRandomPositiveInteger, getRandomArrayElement, getUniqueId, isEscapeKey, showAlert, shuffleArray};

