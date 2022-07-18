import { isEscapeKey } from './util.js';

const showMessage = (typeMessage, message, textButton) =>{
  const messageTemplate = document.querySelector(`#${typeMessage}`).content.querySelector(`.${typeMessage}`);
  const messageElement = messageTemplate.cloneNode(true);
  const closeButtonMessage = messageElement.querySelector(`.${typeMessage}__button`);

  if (message) {
    messageElement.querySelector(`.${typeMessage}__title`).textContent = message;
    closeButtonMessage.textContent  = textButton;
  }
  document.body.append(messageElement);

  const onCloseMessage = () => {
    messageElement.remove();
    document.removeEventListener('keydown', onPopupEscKeydown);
  };

  function onPopupEscKeydown (evt) {
    if(isEscapeKey(evt)){
      evt.preventDefault();
      onCloseMessage();
    }
  }

  messageElement.addEventListener('click', onCloseMessage);
  document.addEventListener('keydown', onPopupEscKeydown);
};

export {showMessage};
