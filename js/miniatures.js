import {createBigPicture} from './big-picture.js';

const picturesContainer = document.querySelector('.pictures');
const picturesListFragment = document.createDocumentFragment();
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const showPictures = (descriptions) => {
  descriptions.forEach((photo) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    const pictureComments = pictureElement.querySelector('.picture__comments');
    const pictureLikes = pictureElement.querySelector('.picture__likes');
    const pictureImg = pictureElement.querySelector('img');

    pictureImg.src = photo.url;
    pictureLikes.textContent = photo.likes;
    pictureComments.textContent = photo.comments.length;
    picturesListFragment.appendChild(pictureElement);

    pictureImg.addEventListener('click', (evt) => {
      evt.preventDefault();
      createBigPicture(pictureElement, pictureLikes.textContent, photo.comments, photo.description);
    });
  });
  picturesContainer.appendChild(picturesListFragment);
};

export {showPictures};
