import { isEscapeKey, isOutsideClick } from './util.js';

const showMessage = (typeMessage, message, textButton) =>{
  const messageTemplate = document.querySelector(`#${typeMessage}`).content.querySelector(`.${typeMessage}`);
  const messageElement = messageTemplate.cloneNode(true);
  messageElement.style.zIndex = '5';
  const closeButtonMessage = messageElement.querySelector(`.${typeMessage}__button`);

  if (message) {
    messageElement.querySeleclor(`.${typeMessage}__title`).textContent = message;
    closeButtonMessage.textContent  = textButton;
  }
  document.body.append(messageElement);

  const onCloseMessage = () => {
    messageElement.remove();
    closeButtonMessage.removeEventListener('click', onCloseMessage);
    document.removeEventListener('click',clickOutside);
    document.removeEventListener('keydown', onPopupEscKeydown);
  };

  function onPopupEscKeydown (evt) {
    if(isEscapeKey(evt)){
      evt.preventDefault();
      onCloseMessage();
    }
  }

  function clickOutside (evt) {
    if(isOutsideClick(evt)) {
      evt.preventDefault();
      onCloseMessage();
    }
  }

  closeButtonMessage.addEventListener('click', onCloseMessage);
  document.addEventListener('keydown', onPopupEscKeydown);
  document.addEventListener('click', clickOutside);
};

export {showMessage};
