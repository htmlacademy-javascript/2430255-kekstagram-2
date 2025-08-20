const photosContainer = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content;
const photosFragment = document.createDocumentFragment();

const renderPhotos = (photos) => {
  photos.forEach(({ url, description, likes, comments }) => {
    const photoElement = photoTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__img').alt = description;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent =
      comments.length;

    photosFragment.appendChild(photoElement);
  });

  photosContainer.appendChild(photosFragment);
};

export { renderPhotos };
