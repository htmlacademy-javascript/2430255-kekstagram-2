const photosContainerElement = document.querySelector('.pictures');
const photoTemplateElement = document.querySelector('#picture').content;

const createPhotoElement = ({ id, url, description, likes, comments }) => {
  const photoCloneElement = photoTemplateElement.cloneNode(true);
  const imgElement = photoCloneElement.querySelector('.picture__img');

  imgElement.src = url;
  imgElement.alt = description;

  photoCloneElement.querySelector('.picture__likes').textContent = likes;
  photoCloneElement.querySelector('.picture__comments').textContent =
    comments.length;
  photoCloneElement.querySelector('.picture').dataset.photoId = id;

  return photoCloneElement;
};

const renderPhotos = (photos = []) => {
  photosContainerElement
    .querySelectorAll('.picture')
    .forEach((pictureElement) => pictureElement.remove());

  if (!Array.isArray(photos) || photos.length === 0) {
    return;
  }

  const photosFragment = document.createDocumentFragment();

  photos.forEach((photoData) => {
    photosFragment.appendChild(createPhotoElement(photoData));
  });

  photosContainerElement.appendChild(photosFragment);
};

export { renderPhotos, photosContainerElement };
