import { makePhotos } from './data.js';
// import './preview.js';

const pictures = document.querySelector('.pictures');
const randomPictureTemplate = document.querySelector('#picture').content;

const groupPictures = makePhotos();
console.log(groupPictures)
const groupPicturesFragment = document.createDocumentFragment();

groupPictures.forEach(({comments, likes, url}) => {
  const pictureElement = randomPictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  groupPicturesFragment.appendChild(pictureElement);
});

pictures.appendChild(groupPicturesFragment);
console.log(pictures);

const thumbnails = document.querySelectorAll('.picture');
console.log(thumbnails)

// addThumbnailClickHandler = (thumbnail, prewiew)=>{

// for (let i = 0; i< thumbnails.length; i++) {
//   addThumbnailClickHandler(thumbnails[i], pictures[i])
// };


