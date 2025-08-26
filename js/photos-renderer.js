const pictures = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture').content;
const photosFragment = document.createDocumentFragment();

const renderPhotos = (photos) => {
  photos.forEach(({ id, url, description, likes, comments }) => {
    const photoElement = photoTemplate.cloneNode(true);
    const img = photoElement.querySelector('.picture__img');
    img.src = url;
    img.alt = description;

    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent =
      comments.length;
    photoElement.querySelector('.picture').dataset.photoId = id;

    photosFragment.appendChild(photoElement);
  });

  pictures.appendChild(photosFragment);
};

export { renderPhotos, pictures };
