import { isEscapeKey } from './utils.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureCancel = bigPicture.querySelector('.big-picture__cancel');

const bigImg = bigPicture.querySelector('.big-picture__img img');
const likesCount = bigPicture.querySelector('.likes-count');
const caption = bigPicture.querySelector('.social__caption');
const commentsList = bigPicture.querySelector('.social__comments');
const commentsCount = bigPicture.querySelector('.social__comment-total-count');
const commentCountBlock = bigPicture.querySelector('.social__comment-count');
const commentsLoader = bigPicture.querySelector('.comments-loader');

function renderBigPicture(photo) {
  bigImg.src = photo.url;
  bigImg.alt = photo.description;
  likesCount.textContent = photo.likes;
  caption.textContent = photo.description;
  commentsCount.textContent = photo.comments.length;

  commentsList.innerHTML = '';

  photo.comments.forEach((comment) => {
    const li = document.createElement('li');
    li.classList.add('social__comment');

    li.innerHTML = `
      <img
        class="social__picture"
        src="${comment.avatar}"
        alt="${comment.name}"
        width="35"
        height="35"
      >
      <p class="social__text">${comment.message}</p>
    `;

    commentsList.appendChild(li);
  });

  commentCountBlock.classList.add('hidden');
  commentsLoader.classList.add('hidden');
}

function openBigPicture(photo) {
  renderBigPicture(photo);
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');
}

function closeBigPicture() {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');
}

function initFullSizeMode(photos, picturesContainer) {
  picturesContainer.addEventListener('click', (evt) => {
    const picture = evt.target.closest('.picture');

    if (picture) {
      evt.preventDefault();
      const photoId = Number(picture.dataset.photoId);
      const photoData = photos.find((p) => p.id === photoId);

      if (photoData) {
        openBigPicture(photoData);
      }
    }
  });

  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeBigPicture();
    }
  });

  bigPictureCancel.addEventListener('click', closeBigPicture);
}

export { initFullSizeMode };
