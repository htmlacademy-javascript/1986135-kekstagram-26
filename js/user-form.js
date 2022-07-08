import { IS_ESCAPE_KEY } from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const body = document.querySelector('body');
const uploadFileInput = document.querySelector('#upload-file');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancelButton = document.querySelector('.img-upload__cancel');
const hashTags = document.querySelector('[name = "hashtags"]');
const textDescription = document.querySelector('[name = "description"]');
const re = /^#[a-zA-ZА-Яа-яЁё0-9]{1,19}$/;

const onUploadImgClose = () => {
  const uploadImageClose = ()=> {
    uploadOverlay.classList.add('hidden');
    body.classList.remove('modal-open');
    uploadCancelButton.removeEventListener ('click', onUploadImgClose);
    document.removeEventListener('keydown', onPopupEscKeydown);
    uploadFileInput.target.value = '';
  };
  return uploadImageClose();
};

function onPopupEscKeydown (evt) {
  if (hashTags === document.activeElement) {
    evt.stopPropagation();
  } else {
    if(IS_ESCAPE_KEY(evt)){
      evt.preventDefault();
      onUploadImgClose();
    }
  }
}

uploadFileInput.addEventListener('change', (evt)=> {
  uploadOverlay.classList.remove('hidden');
  body.classList.add('modal-open');
  uploadCancelButton.addEventListener('click', onUploadImgClose);
});

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper'
}, false);

const unifyHashtags = (value) => value.trim().toLowerCase().split('');

const isArrayUnique = (value)=> {
  if(unifyHashtags(value).includes(value)) {
    return true;
  }
};

const validateDescription = (value) => value.length <= 140;

pristine.addValidator(hashTags, (value)=> unifyHashtags(value).every((elem) => elem.startsWith('#')), 'Хэштег должен начинаться с решетки#', false);
pristine.addValidator(hashTags, (value)=> unifyHashtags(value).every((elem) => re.test(elem)), 'Хэштег может состоять только из букв и цифр без пробелов, специальных символов и знаков пунктуации');
pristine.addValidator(hashTags, (value) =>unifyHashtags(value).every((elem) => elem.length < 2 && elem.length >19), 'Минимальное количество символов - 2, максимальное - 20');
pristine.addValidator(hashTags, (value)=>unifyHashtags(value).length <  5, 'Можно добавить не более 5 хэштегов');
pristine.addValidator(hashTags, (value)=> unifyHashtags(value).every(isArrayUnique), 'Хэштеги не должны повторяться');
pristine.addValidator(textDescription, validateDescription, 'Длина комментария не может составлять больше 140 символов');


const onUploadFormSubnmit = (evt)=> {
  const isImgUploadFormValid =()=> pristine.validate();
  if (!isImgUploadFormValid()) {
    evt.preventDefault();
  }
};
uploadForm.addEventListener('submit', onUploadFormSubnmit);


