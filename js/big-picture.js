const bigPicture = document.querySelector('.big-picture');
const AVATAR_IMAGE_SIZE = 35;
document.addEventListener('keydown', (keyboardEvent) => escapePressed(ev));
bigPicture.querySelector('#picture-cancel').addEventListener('click', closeBigPicture);
const escapePressed = (ev) => ev.key === 'Escape' && closeBigPicture();
function createBigPhoto({url, likes, description, comments}) {
  bigPicture.querySelector('.big-picture__img').src = url;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = comments;

  const commentsListFragment = document.createDocumentFragment();

  for (const comment of comments) {
    commentsListFragment.appendChild(createComment(comment));
  }

  bigPicture.querySelector('.social__comments').replaceChildren(commentsListFragment);
  bigPicture.querySelector('.social__caption').textContent = description;

}
function createComment({avatar, name, message}) {
  const listElement = document.createElement('li');
  listElement.classList.add('social__comments');
  const avatarImg = document.createElement('img');
  avatarImg.classList.add('social__picture');
  avatarImg.src = avatar;
  avatarImg.alt = name;
  avatarImg.width = AVATAR_IMAGE_SIZE;
  avatarImg.height = AVATAR_IMAGE_SIZE;
  const textComment = document.createElement('p');
  textComment.classList.add('social__text');
  textComment.textContent = message;
  listElement.appendChild(avatarImg);
  listElement.appendChild(textComment);
  return listElement;
}
function showBigPhoto(picture) {
  if(document.body.classList.conteins('modal-open')) {
    return;
  }
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
}

export {showBigPhoto};
