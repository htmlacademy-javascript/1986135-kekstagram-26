import { IS_ESCAPE_KEY } from './util.js';

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
  photo.comments.forEach((comments)=> {
    const {avatar, name, message} = comments;
    previewComments.innerHTML = '';
    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('img').src = avatar;
    commentElement.querySelector('img').alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    previewComments.append(commentElement);
  });
};


//закрывает полноразмерное изображение
const onPreviewClose = ()=>{
  const closePreview = () => {
    preview.classList.add('hidden');
    body.classList.remove('modal-open');
    previewCloseButton.removeEventListener('click', onPreviewClose);
    document.removeEventListener('keydown', onPopupEscKeydown);
  };
  return closePreview();
};

function onPopupEscKeydown (evt) {
  if(IS_ESCAPE_KEY(evt)) {
    evt.preventDefault();
    onPreviewClose();
  }
}

//открывает полноразмерное изображение
const openPreview = (photo) => {
  preview.classList.remove('hidden');
  body.classList.add('modal-open');
  commentsLoaderButton.classList.add('hidden');
  commentCounter.classList.add('hidden');
  fillPreview(photo);
  previewCloseButton.addEventListener('click', onPreviewClose);
  document.addEventListener('keydown', onPopupEscKeydown);
};

export {openPreview};
