const successTemplateElement = document.querySelector('#success');
const errorTemplateElement = document.querySelector('#error');

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

  const onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeMessage();
    }
  };

  const onMessageClick = (evt) => {
    if (evt.target === messageElement || evt.target.closest('button')) {
      closeMessage();
    }
  };

  function closeMessage() {
    document.removeEventListener('keydown', onEscKeydown);
    messageElement.removeEventListener('click', onMessageClick);
    messageElement.remove();
    messageElement = null;

    onClose();
  }

  document.addEventListener('keydown', onEscKeydown);
  messageElement.addEventListener('click', onMessageClick);

  return messageElement;
};

export const showSuccessMessage = (callbacks) =>
  createMessage(successTemplateElement, callbacks);

export const showErrorMessage = (callbacks) =>
  createMessage(errorTemplateElement, callbacks);
