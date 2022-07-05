import { isEscapeKey } from './util.js';

const body = document.querySelector('body');
const preview = document.querySelector('.big-picture');
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

// наполняетDOM-элемент 'Полноэкранный показ изображения' данными из pictures

const fillPreview =(photo)=> {
  previewImage.src = photo.url;
  previewLikes.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  previewCaption.textContent = photo.description;
  const comments = photo.comments;
  comments.forEach((comment) => {
    previewComments.innerHTML = '';
    for (let i = 0; i< comments.length; i++) {
      comment = comments[i];
      const commentElement = commentTemplate.cloneNode(true);
      commentElement.querySelector('img').src = comment.avatar;
      commentElement.querySelector('img').alt = comment.name;
      commentElement.querySelector('.social__text').textContent = comment.message;
      previewComments.append(commentElement);

    }
  });
};

//закрывает полноразмерное изображение
const closePreview = () => {
  preview.classList.add('hidden');
  body.classList.remove('modal-open');
  previewCloseButton.removeEventListener('click', closePreview);
  document.removeEventListener('keydown', onPopupEscKeydown);
};

function onPopupEscKeydown (evt) {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    closePreview();
  }
}

//открывает полноразмерное изображение
const openPreview = (photo) => {
  preview.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsLoaderButton.classList.add('hidden');
  commentCounter.classList.add('hidden');
  fillPreview(photo);
  previewCloseButton.addEventListener('click', closePreview);
  document.addEventListener('keydown', onPopupEscKeydown);
};

export {openPreview};
