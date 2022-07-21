import { isEscapeKey } from './util.js';

const COMMENTS_TO_SHOW = 5;

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
const commentsLoaded = preview.querySelector('.social__comment-loaded');
const previewCloseButton = preview.querySelector('.cancel');

let commentsCounter = 0;
let commentsToRender = [];

const showCommentsLoaded = (quantity) => {
  commentsLoaded.textContent = `${quantity}`;
};
const renderComments = (comments) => {
  comments.forEach(({avatar, name, message})=> {
    const commentElement = commentTemplate.cloneNode(true);
    commentElement.querySelector('img').src = avatar;
    commentElement.querySelector('img').alt = name;
    commentElement.querySelector('.social__text').textContent = message;
    previewComments.append(commentElement);
  });
  commentsCounter += comments.length;
  showCommentsLoaded(commentsCounter);
};

const hideCommentsLoaderButton = () => {
  commentsLoaderButton.classList.add('hidden');
};

const onCommentsLoadMoreButtonClick = ()=> {
  if(commentsToRender.length <= COMMENTS_TO_SHOW) {
    hideCommentsLoaderButton();
  }
  renderComments(commentsToRender.splice(0, COMMENTS_TO_SHOW));
};

const showCommentsLoaderButton = ()=>{
  commentsLoaderButton.classList.remove('hidden');
  commentsLoaderButton.addEventListener('click', onCommentsLoadMoreButtonClick);
};

const showCommentsBlock = () => {
  renderComments(commentsToRender.splice(0, COMMENTS_TO_SHOW));
};


const fillPreview =(photo)=> {
  previewImage.src = photo.url;
  previewLikes.textContent = photo.likes;
  commentsCount.textContent = photo.comments.length;
  previewCaption.textContent = photo.description;
  previewComments.innerHTML = '';
  commentsToRender = photo.comments.slice();
  showCommentsBlock();
  if(photo.comments.length <= COMMENTS_TO_SHOW) {
    hideCommentsLoaderButton();
  } else {
    showCommentsLoaderButton();
  }
};

//закрывает полноразмерное изображение

const closePreview = () => {
  preview.classList.add('hidden');
  body.classList.remove('modal-open');
  commentsCounter = 0;
  commentsLoaderButton.removeEventListener('click', onCommentsLoadMoreButtonClick);
  previewCloseButton.removeEventListener('click', onPreviewClose);
  document.removeEventListener('keydown', onPopupEscKeydown);
};

function onPreviewClose () {
  closePreview();
}

function onPopupEscKeydown (evt) {
  if(isEscapeKey(evt)) {
    evt.preventDefault();
    onPreviewClose();
  }
}

//открывает полноразмерное изображение
const openPreview = (photo) => {
  preview.classList.remove('hidden');
  body.classList.add('modal-open');
  fillPreview(photo);
  previewCloseButton.addEventListener('click', onPreviewClose);
  document.addEventListener('keydown', onPopupEscKeydown);
};

export {openPreview};
