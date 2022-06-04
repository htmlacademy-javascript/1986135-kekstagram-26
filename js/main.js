// Функция, возвращающая случ.число из диапазона включительно(из MDN)

function getRandomFromRangeInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);

  if(min < 0, max < 0){
    throw new RangeError('Параметр должен быть больше или равным нулю');
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
getRandomFromRangeInclusive();

//проверка длины строки

function checkStringLength(string, maxStringLength) {
  if (string.length <= maxStringLength) {
    return true;
  }
  return false;
}

checkStringLength ();
// Вопрос: в дискорде было обсуждение на счет проверки, является ли строка строкой. она нужна эта проверка? где эта функция может примениться еще, кроме подстчета символов в комментарии?
