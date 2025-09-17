const successTemplate = document.querySelector('#success');
const errorTemplate = document.querySelector('#error');

const createMessage = (template) => {
  if (!template) {
    return;
  }

  const fragment = template.content.cloneNode(true);
  const messageElement = fragment.firstElementChild;
  document.body.append(messageElement);

  const onEscKeydown = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      closeMessage();
    }
  };

  const onClick = (evt) => {
    if (evt.target === messageElement || evt.target.closest('button')) {
      closeMessage();
    }
  };

  function closeMessage() {
    document.removeEventListener('keydown', onEscKeydown);
    messageElement.removeEventListener('click', onClick);
    messageElement.remove();
  }

  document.addEventListener('keydown', onEscKeydown);
  messageElement.addEventListener('click', onClick);

  return messageElement;
};

export const showSuccessMessage = () => createMessage(successTemplate);
export const showErrorMessage = () => createMessage(errorTemplate);
