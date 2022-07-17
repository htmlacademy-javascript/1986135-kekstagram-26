import { isEscapeKey } from './util.js';
import { resetScale, changeScale, removeScale } from './scale.js';
import {setupEffects, destroyEffects} from './slider-effects.js';
import { showMessage } from './popup-messages.js';
import {sendFormData} from './api.js';

const RE = /^#[a-zA-ZА-Яа-яЁё0-9]{1,19}$/;
const HASHTAG = {
  MAX_SIZE: 19,
  MIN_SIZE: 2,
  AMOUNT: 5
};
const uploadForm = document.querySelector('.img-upload__form');
const body = document.querySelector('body');
const uploadFileInput = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancelButton = document.querySelector('.img-upload__cancel');
const hashTags = document.querySelector('[name = "hashtags"]');
const textDescription = document.querySelector('[name = "description"]');
const uploadSubmitButton = document.querySelector('.img-upload__submit');

const uploadImageClose = ()=> {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadCancelButton.removeEventListener ('click', onUploadImgClose);
  document.removeEventListener('keydown', onPopupEscKeydown);
  uploadForm.reset();
  resetScale();
  removeScale();
  destroyEffects();
};

function onUploadImgClose () {
  uploadImageClose();
}

function onPopupEscKeydown (evt) {
  // const errorElement = document.querySelector('.error');
  // const successElement  = document.querySelector('.success');
  if(hashTags === document.activeElement) {
    evt.stopPropagation();
  } else if(textDescription === document.activeElement) {
    evt.stopPropagation();
  } else {
    if(isEscapeKey(evt)) {
      evt.preventDefault();
      onUploadImgClose();
    }
  }
}

uploadFileInput.addEventListener('change', ()=> {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  uploadCancelButton.addEventListener('click', onUploadImgClose);
  document.addEventListener('keydown', onPopupEscKeydown);
  changeScale();
  setupEffects();
});

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
}, false);

const unifyHashtags = (value) => {
  if (!value.length) {
    return [];
  }
  return value.trim().toLowerCase().split(' ');
};

const isArrayUnique = (array)=> new Set(array).size === array.length;

const validateDescription = (value) => value.length <= 140;

pristine.addValidator(hashTags, (value)=> unifyHashtags(value).every((elem) => elem.startsWith('#')), 'Хэштег должен начинаться с решетки#');
pristine.addValidator(hashTags, (value)=> unifyHashtags(value).every((elem) => RE.test(elem)), 'Хэштег может состоять только из букв и цифр без пробелов, специальных символов и знаков пунктуации. Хэштеги должны разделяться пробелами');
pristine.addValidator(hashTags, (value) => unifyHashtags(value).every((elem) => elem.length >= HASHTAG.MIN_SIZE), 'Минимальное количество символов - 2, максимальное - 20, включая #');
pristine.addValidator(hashTags, (value) =>  unifyHashtags(value).every((elem) => elem.length <= HASHTAG.MAX_SIZE), 'Максимальное количество символов - 20, включая #');
pristine.addValidator(hashTags, (value)=> unifyHashtags(value).length <=  HASHTAG.AMOUNT, 'Можно добавить не более 5 хэштегов');

pristine.addValidator(hashTags, (value)=>  isArrayUnique(unifyHashtags(value)), 'Хэштеги не должны повторяться, #ХэшТег и #хэштег считаются одним и тем же тегом');
pristine.addValidator(textDescription, validateDescription, 'Длина комментария не может составлять больше 140 символов');

const blockUploadSubmitButton = () => {
  uploadSubmitButton.disabled = true;
  uploadSubmitButton.textContent = 'Публикуем...';
};

const unblockUploadSubmitButton = () => {
  uploadSubmitButton.disabled = false;
  uploadSubmitButton.textContent = 'Опубликовать';
};

const onUploadFormSubmit = (evt) =>{
  evt.preventDefault();
  const isImgUploadFormValid =()=> pristine.validate();
  if (!isImgUploadFormValid()) {
    evt.preventDefault();
    blockUploadSubmitButton();
  }
  blockUploadSubmitButton();
  sendFormData(
    ()=> {
      showMessage('success');
      unblockUploadSubmitButton();
      uploadForm.reset();
    },
    ()=> {
      showMessage('error');
      unblockUploadSubmitButton();
    },
    new FormData(evt.target),
  );
};

uploadForm.addEventListener('submit', onUploadFormSubmit);
