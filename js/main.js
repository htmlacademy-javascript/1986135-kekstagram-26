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
//генерация от кекса
const getRandomPositiveInteger = (a, b) => {
  const lower = Math.ceil(Math.min(Math.abs(a), Math.abs(b)));
  const upper = Math.floor(Math.max(Math.abs(a), Math.abs(b)));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};
const messages = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const names = ['Артем', 'Михаил', 'Зоя','Анна', 'Борис', 'Татьяна', 'Роман', 'Anna', 'Lucas', 'Дмитрий', 'Люси', 'Ванда', 'Max'];

const getRandomArrayElement = (elements) => elements[getRandomPositiveInteger(0, elements.length - 1)];
const maxPhotoQuantity = 25;

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
const numbersUnique = getUniqueId(500);//взяла с запасом

const createPhotoDescription = (id)=> {
  const createComment = () =>
    ({id: numbersUnique[Math.floor(Math.random()*numbersUnique.length)],
      avatar: `img/avatar-${ getRandomPositiveInteger(1, 6)  }.svg`,
      message: getRandomArrayElement(messages),
      name: getRandomArrayElement(names)
    });
  //создание массива комментариев
  const makeComments=()=>{
    const commentsArray = [];
    for (let i=0; i<=messages.length-1; i++){
      commentsArray.push(createComment(i));
    }
    return commentsArray;
  };
  const comments = makeComments();
  //комменты для каждой фото
  const makeCommentsForPhoto = () => {
    const photosComments = [];
    const commentCount = getRandomPositiveInteger(1,4);
    for(let i =0; i<=commentCount; i++) {
      photosComments.push(getRandomArrayElement(comments));
    }
    return photosComments;
  };
  return {
    id,
    url: `photos/${ id }.jpg`,
    description: 'Просто класс!',
    likes: getRandomPositiveInteger(15, 200),
    comments: makeCommentsForPhoto()
  };
};

const createPhotos = (count) => {
  const photosArray = [];
  for( let i=1; i<=count; i++){
    photosArray.push(createPhotoDescription(i));
  }
  return photosArray;
};

const photos = createPhotos(maxPhotoQuantity);
console.log(photos);
