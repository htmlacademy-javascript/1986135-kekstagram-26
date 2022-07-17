const getPhotoData = (onSuccess, onFail) => {
  fetch('https://26.javascript.pages.academy/kekstagram/data').then((response) => {
    if(response.ok) {
      response.json()
        .then((data)=> {
          onSuccess(data);
        });
    }else{
      onFail('Не удалось загрузить фото с сервера');
    }
  })
    .catch(()=> {
      onFail('Не удалось загрузить фото с сервера');
    });
};

const sendFormData = (onSuccess, onFail, body)=> {
  fetch('https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok){
        onSuccess();
      } else {
        onFail();
      }
    })
    .catch(()=> onFail());
};
export {getPhotoData, sendFormData};
