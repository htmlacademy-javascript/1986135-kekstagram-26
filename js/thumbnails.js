import { makePhotos } from './data.js';
import {openPreview} from './preview.js';

const pictures = document.querySelector('.pictures');
const randomPictureTemplate = document.querySelector('#picture').content;

const groupPictures = makePhotos();
// console.log(groupPictures)
const groupPicturesFragment = document.createDocumentFragment();

groupPictures.forEach((photo) => {
  const {comments, likes, url} = photo;
  const pictureElement = randomPictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;

  groupPicturesFragment.appendChild(pictureElement);

  pictureElement.addEventListener('click', ()=> {
    openPreview(photo);
  });

});

pictures.appendChild(groupPicturesFragment);
