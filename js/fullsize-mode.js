import { isEscapeKey } from './utils.js';

const COMMENTS_PER_PAGE = 5;

const bodyElement = document.querySelector('body');
const bigPictureElement = bodyElement.querySelector('.big-picture');
const bigPictureCancelElement = bigPictureElement.querySelector(
  '.big-picture__cancel',
);
const bigImgElement = bigPictureElement.querySelector('.big-picture__img img');
const likesCountElement = bigPictureElement.querySelector('.likes-count');
const captionElement = bigPictureElement.querySelector('.social__caption');
const commentsListElement =
  bigPictureElement.querySelector('.social__comments');
const commentsCountElement = bigPictureElement.querySelector(
  '.social__comment-total-count',
);
const commentCountBlockElement = bigPictureElement.querySelector(
  '.social__comment-count',
);
const commentsLoaderElement =
  bigPictureElement.querySelector('.comments-loader');
const commentsShownCountElement = bigPictureElement.querySelector(
  '.social__comment-shown-count',
);

let allComments = [];
let shownComments = 0;

const renderComments = () => {
  const nextComments = allComments.slice(
    shownComments,
    shownComments + COMMENTS_PER_PAGE,
  );

  nextComments.forEach((comment) => {
    const liElement = document.createElement('li');
    liElement.classList.add('social__comment');

    const imgElement = document.createElement('img');
    imgElement.classList.add('social__picture');
    imgElement.src = comment.avatar;
    imgElement.alt = comment.name;
    imgElement.width = 35;
    imgElement.height = 35;

    const pElement = document.createElement('p');
    pElement.classList.add('social__text');
    pElement.textContent = comment.message;

    liElement.appendChild(imgElement);
    liElement.appendChild(pElement);

    commentsListElement.appendChild(liElement);
  });

  shownComments += nextComments.length;
  commentsCountElement.textContent = allComments.length;
  commentsShownCountElement.textContent = shownComments;

  commentsLoaderElement.classList.toggle(
    'hidden',
    shownComments >= allComments.length,
  );
};

const renderBigPicture = (photo) => {
  bigImgElement.src = photo.url;
  bigImgElement.alt = photo.description;
  likesCountElement.textContent = photo.likes;
  captionElement.textContent = photo.description;

  allComments = photo.comments;
  shownComments = 0;
  commentsListElement.innerHTML = '';

  commentCountBlockElement.classList.remove('hidden');

  renderComments();
};

const openBigPicture = (photo) => {
  renderBigPicture(photo);
  bigPictureElement.classList.remove('hidden');
  bodyElement.classList.add('modal-open');

  document.addEventListener('keydown', documentKeydownHandler);
  bigPictureCancelElement.addEventListener('click', bigPictureCancelHandler);
  commentsLoaderElement.addEventListener('click', commentsLoadHandler);
};

const closeBigPicture = () => {
  bigPictureElement.classList.add('hidden');
  bodyElement.classList.remove('modal-open');

  document.removeEventListener('keydown', documentKeydownHandler);
  bigPictureCancelElement.removeEventListener('click', bigPictureCancelHandler);
  commentsLoaderElement.removeEventListener('click', commentsLoadHandler);
};

const initFullSizeMode = (photos, picturesContainer) => {
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
};

function documentKeydownHandler(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

function bigPictureCancelHandler() {
  closeBigPicture();
}

function commentsLoadHandler() {
  renderComments();
}

export { initFullSizeMode };
