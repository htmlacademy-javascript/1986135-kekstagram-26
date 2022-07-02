import { isEscapeKey } from './util.js';
import { makeCommentsForPhoto } from './data.js';

const body = document.querySelector('body');
const preview = document.querySelector('.big-picture');
const previewFragment = preview.querySelector('.big-picture__preview');
const previewImage = preview.querySelector('.big-picture__img').querySelector('img');
const commentsCountBlock = preview.querySelector('.social__comment-count');
const commentsCount = commentsCountBlock.querySelector('.comments-count');
const previewCaption = preview.querySelector('.social__caption');
const previewLikes = preview.querySelector('.likes-count');
const previewComments = preview.querySelector('.social__comments');
const commentTemplate = preview.querySelector('.social__comment');
const commentsLoaderButton = preview.querySelector('.comments-loader');
const commentCounter = preview.querySelector('.social__comment-count');
const previewCloseButton = preview.querySelector('.cancel');

//функция для создания элемента DOM

const commentsArray = makeCommentsForPhoto();
const createCommentElements = (items) => {
  const comments = [];
  previewComments.innerHTML = '';
  for (let i=0; i < items.length; i++) {
    const item = items[i];
    const comment = commentTemplate.cloneNode(true);
    comment.querySelector('img').src = item.avatar;
    comment.querySelector('img').alt = item.name;
    comment.querySelector('.social__text').textContent = item.message;
    comments.push(comment);
  }
  previewComments.append(...comments);
  return previewComments;
};

// наполняетDOM-элемент 'Полноэкранный показ изображения' данными из pictures
const fillPreview =(photo)=> {
  previewImage.src = photo.url;
  previewCaption.textContent = photo.description;
  previewLikes.textContent = photo.likes;
  const comments = photo.comments.slice();
  commentsCount.textContent = comments.length;
  createCommentElements(commentsArray);
  return previewFragment;
};

//закрывает полноразмерное изображение
const closePreview = () => {
  preview.classList.add('hidden');
  body.classList.remove('modal-open');
  document.removeEventListener('keydown', onPopupEscKeydown);
};

const onPopupEscKeydown = (evt) => {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closePreview();
  }
};
//открывает полноразмерное изображение
const openPreview = () => {
  preview.classList.remove('hidden');
  body.classList.add('.modal-open');
  commentsLoaderButton.classList.add('hidden');
  commentCounter.classList.add('hidden');
  fillPreview(photo);

  document.removeEventListener('keydown', onPopupEscKeydown);
};

previewCloseButton.addEventListener ('click', () => {
  closePreview();
});

export {openPreview, fillPreview};
