const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooser = document.querySelector('.img-upload__input');
const imagePreview = document.querySelector('.img-upload__preview').querySelector('img');

const onFileChooserChange = () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if(matches) {
    imagePreview.src = URL.createObjectURL(file);
  }
};
fileChooser.addEventListener('change', onFileChooserChange);
