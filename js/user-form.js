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
const ERROR_MESSAGE = 'error';
const SUCCESS_MESSAGE = 'success';
const MAX_TEXT_SYMBOLS = 140;
const uploadForm = document.querySelector('.img-upload__form');
const body = document.querySelector('body');
const uploadFileInput = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancelButton = document.querySelector('.img-upload__cancel');
const hashTags = document.querySelector('[name = "hashtags"]');
const textDescription = document.querySelector('[name = "description"]');
const uploadSubmitButton = document.querySelector('.img-upload__submit');

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
}, false);

const uploadImageClose = ()=> {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadCancelButton.removeEventListener ('click', onUploadImgClose);
  document.removeEventListener('keydown', onPopupEscKeydown);
  uploadForm.reset();
  pristine.reset();
  resetScale();
  removeScale();
  destroyEffects();
};

function onUploadImgClose () {
  uploadImageClose();
}


function onPopupEscKeydown (evt) {
  const errorElement = document.querySelector('.error');
  if (!isEscapeKey(evt) || errorElement) {
    return;
  }
  if(hashTags === document.activeElement || textDescription === document.activeElement) {
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

const unifyHashtags = (value) => {
  if (!value.length) {
    return [];
  }
  return value.trim().toLowerCase().split(' ');
};

const isArrayUnique = (array)=> new Set(array).size === array.length;

const validateDescription = (value) => value.length <= MAX_TEXT_SYMBOLS;

pristine.addValidator(hashTags, (value)=> unifyHashtags(value).every((elem) => elem.startsWith('#')), 'Хэштег должен начинаться с решетки#', 6, false);
pristine.addValidator(hashTags, (value)=> unifyHashtags(value).every((elem) => RE.test(elem)), 'Хэштег может состоять только из букв и цифр без пробелов, специальных символов и знаков пунктуации. Хэштеги должны разделяться пробелами', 4, false);
pristine.addValidator(hashTags, (value) => unifyHashtags(value).every((elem) => elem.length >= HASHTAG.MIN_SIZE), 'Минимальное количество символов - 2, максимальное - 20, включая #', 5, false);
pristine.addValidator(hashTags, (value) =>  unifyHashtags(value).every((elem) => elem.length <= HASHTAG.MAX_SIZE), 'Максимальное количество символов - 20, включая #', 4, false);
pristine.addValidator(hashTags, (value)=> unifyHashtags(value).length <=  HASHTAG.AMOUNT, 'Можно добавить не более 5 хэштегов', 2, false);

pristine.addValidator(hashTags, (value)=>  isArrayUnique(unifyHashtags(value)), 'Хэштеги не должны повторяться, #ХэшТег и #хэштег считаются одним и тем же тегом', 3, false );
pristine.addValidator(textDescription, validateDescription, 'Длина комментария не может составлять больше 140 символов', 3, false);

const blockUploadSubmitButton = (value) => {
  uploadSubmitButton.disabled = value;
};

const onUploadFormSubmit = (evt) =>{
  evt.preventDefault();
  const isImgUploadFormValid =()=> pristine.validate();
  if (!isImgUploadFormValid()) {
    return;
  }
  blockUploadSubmitButton(true);
  sendFormData(
    ()=> {
      uploadImageClose();
      showMessage(SUCCESS_MESSAGE);
      blockUploadSubmitButton(false);
      uploadForm.reset();
      pristine.reset();
    },
    ()=> {
      showMessage(ERROR_MESSAGE);
      blockUploadSubmitButton(false);
    },
    new FormData(evt.target),
  );
};

uploadForm.addEventListener('submit', onUploadFormSubmit);
