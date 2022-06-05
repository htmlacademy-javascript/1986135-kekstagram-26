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

//проверка длины строки

const checkStringLength = (string, maxStringLength) => string.length <= maxStringLength;
checkStringLength ();
