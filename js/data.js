import {getRandomPositiveInteger, getRandomArrayElement, getUniqueId} from './util.js';

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const NAMES = ['Артем', 'Михаил', 'Зоя','Анна', 'Борис', 'Татьяна', 'Роман', 'Anna', 'Lucas', 'Дмитрий', 'Люси', 'Ванда', 'Max'];

const DESCRIPTION = ['Наконец-то отдохну!', 'Сколько лет этому указателю?', 'Какой цвет!!!', 'А вот и я','Даже рис рад', 'Ух, ну, и красотка','После такого отдыха могу позволить себе только такой завтрак', 'Мама морсик привезла)', 'Страшнова-то', 'Обувница-огонь, поищу на озоне', 'Тропинка к счастью', 'Что-то он не туда заехал', 'И никакого пластика, только металл!','Котосушка','Мега-астро-тапульки','Хорошо летит, только что?','А неплохо поют, кстати','Прячется от кого-то','Ночные светила','Не видела еще такие бунгало', 'Надеюсь будет вкусно', 'какие краски','Вроде и милый, а вроде и бееее','Кто это, на Раммштайн не похожи','Опасненько'];
const MAX_PHOTO_QUANTITY = 25;

const NUMBERS_UNIQUE = getUniqueId(500);//взяла с запасом

const createComment = () =>
  ({id: NUMBERS_UNIQUE.shift(),
    avatar: `img/avatar-${ getRandomPositiveInteger(1, 6)  }.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES)
  });
//комменты для каждой фото


//создание массива комментариев
const makeComments=()=>{
  const commentsArray = [];
  for (let i=0; i<=MESSAGES.length-1; i++){
    commentsArray.push(createComment(i));
  }
  return commentsArray;
};
const makeCommentsForPhoto = () => {
  const COMMENTS = makeComments();
  const photosComments = [];
  const commentCount = getRandomPositiveInteger(1,2);
  for(let i =0; i<commentCount; i++) {
    photosComments.push(getRandomArrayElement(COMMENTS));
  }
  return photosComments;
};
console.log(makeCommentsForPhoto());
//
const createPhotoDescription = (id)=> ({
  id,
  url: `photos/${ id }.jpg`,
  description: DESCRIPTION.shift(),
  likes: getRandomPositiveInteger(15, 200),
  comments: makeCommentsForPhoto()
});

const createPhotos = (count) => {
  const photosArray = [];
  for( let i=1; i<=count; i++){
    photosArray.push(createPhotoDescription(i));
  }
  return photosArray;
};

const makePhotos = () => createPhotos(MAX_PHOTO_QUANTITY);

export {makePhotos};
export {createComment};
export{makeCommentsForPhoto};
export {createPhotoDescription};
