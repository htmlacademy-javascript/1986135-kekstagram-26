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

//генерация данных
//от кекса
const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const getUniqueNumbers = function (numberOfDigits) {
  const arrayOfUniques = [];
  const getNumber = () => {
    const number = getRandomPositiveInteger(1, numberOfDigits);
    if (arrayOfUniques.includes(number)){
      getNumber();
    } else {
      arrayOfUniques.push(number);
    }
  };
  for (let i = 0; i < numberOfDigits; i++){
    getNumber();
  }
  return arrayOfUniques;
};

const id = [1, 15, 6, 4, 5, 6, 7, 8, 9, 25, 11, 12, 13, 14, 2, 16, 17, 18, 19, 20, 21, 22, 23, 24, 10];
const url = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25];
const message = ['В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.'];

const names = ['Anna', 'Lucas', 'Дмитрий', 'Люси', 'Ванда', 'Max'];

const createObject = () => {
  const getUniqueIdObject = () => {
    id.push (id.shift());
    return id.shift();
  };
  const getUniqueUrl = () => {
    url.push(url.shift());
    return url.shift();
  };
  const getLikes = getRandomPositiveInteger(15, 200);
  const quantityOfComments  = getRandomPositiveInteger(0,10);
  const getUniqueCommentIdNumbersArray = getUniqueNumbers(250);
  const getUniqueCommentsId =() => getUniqueCommentIdNumbersArray.pop();
  const getAvatar = getRandomPositiveInteger(1, 6);
  const randomMessageIndex = getRandomPositiveInteger(0, message.length - 1);
  const randomNamesIndex = getRandomPositiveInteger(0, names.length - 1);
  const createComments = function() {
    return {
      id: getUniqueCommentsId(),
      avatar: `img/avatar-${ getAvatar  }.svg`,
      message: message[randomMessageIndex],
      name: names[randomNamesIndex]
    };
  };

  const similarComments = Array.from({length:quantityOfComments}, createComments);
  return {
    id: getUniqueIdObject(),
    url: `photos/${  getUniqueUrl()  }.jpg`,
    description: 'Просто класс!',
    likes: getLikes,
    comments: similarComments
  };
};

const similarObjects = Array.from({length: 25}, createObject);
console.log(similarObjects);
