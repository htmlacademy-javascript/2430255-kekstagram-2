import { isEscapeKey } from './utils.js';

const COMMENTS_PER_PAGE = 5;
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
const commentsShownCount = bigPicture.querySelector(
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
    const li = document.createElement('li');
    li.classList.add('social__comment');

    const img = document.createElement('img');
    img.classList.add('social__picture');
    img.src = comment.avatar;
    img.alt = comment.name;
    img.width = 35;
    img.height = 35;

    const p = document.createElement('p');
    p.classList.add('social__text');
    p.textContent = comment.message;

    li.appendChild(img);
    li.appendChild(p);

    commentsList.appendChild(li);
  });

  shownComments += nextComments.length;
  commentsCount.textContent = allComments.length;
  commentsShownCount.textContent = shownComments;

  commentsLoader.classList.toggle(
    'hidden',
    shownComments >= allComments.length,
  );
};

const renderBigPicture = (photo) => {
  bigImg.src = photo.url;
  bigImg.alt = photo.description;
  likesCount.textContent = photo.likes;
  caption.textContent = photo.description;

  allComments = photo.comments;
  shownComments = 0;
  commentsList.innerHTML = '';

  commentCountBlock.classList.remove('hidden');

  renderComments();
};

const openBigPicture = (photo) => {
  renderBigPicture(photo);
  bigPicture.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  bigPictureCancel.addEventListener('click', onBigPictureCancelClick);
  commentsLoader.addEventListener('click', onCommentsLoaderClick);
};

const closeBigPicture = () => {
  bigPicture.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  bigPictureCancel.removeEventListener('click', onBigPictureCancelClick);
  commentsLoader.removeEventListener('click', onCommentsLoaderClick);
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

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPicture();
  }
}

function onBigPictureCancelClick() {
  closeBigPicture();
}

function onCommentsLoaderClick() {
  renderComments();
}

export { initFullSizeMode };
