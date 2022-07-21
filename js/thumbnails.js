import { getPhotoData } from './api.js';
import {openPreview} from './preview.js';
import { showAlert } from './util.js';
import {setupFilters} from './filter-photos.js';

const pictures = document.querySelector('.pictures');
const randomPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const filtersContainer = document.querySelector('.img-filters');

const clearPictureList = () => {
  pictures.querySelectorAll('.picture').forEach((item)=> item.remove());
};

const createPicturesList = (pictureData) => {
  const groupPicturesFragment = document.createDocumentFragment();
  pictureData.forEach((photo) => {
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
  clearPictureList();
  pictures.appendChild(groupPicturesFragment);
};

const renderPictureList = (pictureData) => {
  createPicturesList(pictureData);
  filtersContainer.classList.remove('img-filters--inactive');

};

getPhotoData((data)=> {
  renderPictureList(data);
  setupFilters(data);
},
()=> showAlert('Не удалось загрузить фото с сервера'));


export { renderPictureList };

