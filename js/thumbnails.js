import { makePhotos } from './data.js';

const pictures = document.querySelector('.pictures');
const randomPictureTemplate = document.querySelector('#picture').content;

const groupPictures = makePhotos();

const groupPicturesFragment = document.createDocumentFragment();

groupPictures.forEach(({comments, likes, url}) => {
  const pictureElement = randomPictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  groupPicturesFragment.appendChild(pictureElement);
});

pictures.appendChild(groupPicturesFragment);
