import {createObject} from './data.js';
import {showBigPhoto} from './big-photo.js';
const picturesContainer = document.querySelector('.pictures');
const picturesListFragment = document.createDocumentFragment();
const pictureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const picture = createObject();
const showPictures = (photos) => {
  pictures = photos;
  photos.forEach(({url, comments, likes}, index) => {
    const pictureElement = pictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').src = url;
    pictureElement.querySelector('.picture_img').addEventListener('click', (ev) => {
      ev.preventDefault();
      showBigPhoto(description);
    });
    pictureElement.querySelector('.picture__likes').textContent = likes;
    pictureElement.querySelector('.picture__comments').textContent = comments.length;
    picturesListFragment.appendChild(pictureElement);
  });
  picturesContainer.appendChild(picturesListFragment);
};

export {showPictures};
