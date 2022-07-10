import { IS_ESCAPE_KEY } from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const body = document.querySelector('body');
const uploadFileInput = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancelButton = document.querySelector('.img-upload__cancel');
const hashTags = document.querySelector('[name = "hashtags"]');
const textDescription = document.querySelector('[name = "description"]');
const re = /^#[a-zA-ZА-Яа-яЁё0-9]{1,19}$/;
const hashtag = {
  MAX_SIZE: 19,
  MIN_SIZE: 2,
  AMOUNT: 5
};

const uploadImageClose = ()=> {
  uploadOverlay.classList.add('hidden');
  body.classList.remove('modal-open');
  uploadCancelButton.removeEventListener ('click', onUploadImgClose);
  document.removeEventListener('keydown', onPopupEscKeydown);
  uploadFileInput.target.value = '';
};

function onUploadImgClose () {
  uploadImageClose();
}

function onPopupEscKeydown (evt) {
  if(hashTags === document.activeElement) {
    evt.stopPropagation();
  } else if(textDescription === document.activeElement) {     evt.stopPropagation();
  } else if(IS_ESCAPE_KEY(evt)){
    evt.preventDefault();
    onUploadImgClose();
  }
}

uploadFileInput.addEventListener('change', (evt)=> {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  uploadCancelButton.addEventListener('click', onUploadImgClose);
  document.addEventListener('keydown', onPopupEscKeydown);
});

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
}, false);

const unifyHashtags = (value) => value.trim().toLowerCase().split(' ');

const isArrayUnique = (array)=> new Set(array).size === array.length;


const validateDescription = (value) => value.length <= 140;

pristine.addValidator(hashTags, (value)=> unifyHashtags(value).every((elem) => elem.startsWith('#')), 'Хэштег должен начинаться с решетки#', false);
pristine.addValidator(hashTags, (value)=> unifyHashtags(value).every((elem) => re.test(elem)), 'Хэштег может состоять только из букв и цифр без пробелов, специальных символов и знаков пунктуации. Хэштеги должны разделяться пробелами');
pristine.addValidator(hashTags, (value) =>unifyHashtags(value).every(() => value.length >= hashtag.MIN_SIZE), 'Минимальное количество символов - 2, максимальное - 20, включая #');
pristine.addValidator(hashTags, (value) =>unifyHashtags(value).every(() => value.length <= hashtag.MAX_SIZE), 'Максимальное количество символов - 20, включая #');
pristine.addValidator(hashTags, (value)=>unifyHashtags(value).length !== 0, 'Хэштег необязателен');
pristine.addValidator(hashTags, (value)=>unifyHashtags(value).length <=  hashtag.AMOUNT, 'Можно добавить не более 5 хэштегов');
pristine.addValidator(hashTags, (value)=> isArrayUnique(unifyHashtags(value)), 'Хэштеги не должны повторяться, #ХэшТег и #хэштег считаются одним и тем же тегом');
pristine.addValidator(textDescription, validateDescription, 'Длина комментария не может составлять больше 140 символов');

const onUploadFormSubnmit = (evt)=> {
  const isImgUploadFormValid =()=> pristine.validate();
  if (!isImgUploadFormValid()) {
    evt.preventDefault();
  }
};
uploadForm.addEventListener('submit', onUploadFormSubnmit);


