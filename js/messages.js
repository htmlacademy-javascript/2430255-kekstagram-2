const successTemplateElement = document.querySelector('#success');
const errorTemplateElement = document.querySelector('#error');
const dataErrorTemplateElement = document.querySelector('#data-error');

let messageElement = null;

const createMessage = (
  templateElement,
  { onOpen = () => {}, onClose = () => {} } = {},
) => {
  if (!templateElement) {
    return;
  }

  const fragment = templateElement.content.cloneNode(true);
  messageElement = fragment.firstElementChild;
  document.body.append(messageElement);

  onOpen();

  const escKeydownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeMessage();
    }
  };

  const messageClickHandler = (evt) => {
    if (evt.target === messageElement || evt.target.closest('button')) {
      closeMessage();
    }
  };

  function closeMessage() {
    document.removeEventListener('keydown', escKeydownHandler);
    messageElement.removeEventListener('click', messageClickHandler);
    messageElement.remove();
    messageElement = null;

    onClose();
  }

  document.addEventListener('keydown', escKeydownHandler);
  messageElement.addEventListener('click', messageClickHandler);

  return messageElement;
};

export const showSuccessMessage = (callbacks) =>
  createMessage(successTemplateElement, callbacks);

export const showErrorMessage = (callbacks) =>
  createMessage(errorTemplateElement, callbacks);

export const showDataErrorMessage = () => {
  if (!dataErrorTemplateElement) {
    return;
  }

  const fragment = dataErrorTemplateElement.content.cloneNode(true);
  const message = fragment.firstElementChild;

  document.body.append(message);

  setTimeout(() => {
    message.remove();
  }, 5000);

  return message;
};
