const isEscapeKey = (evt) => evt.key === 'Escape';
const bigPicture = document.querySelector('.big-picture');
const commentTemplate = document.querySelector('#comment').content.querySelector('li');
const commentsOfPicture = bigPicture.querySelector('.social__comments');
const bigPictureCloseButton = bigPicture.querySelector('.big-picture__cancel');
const socialCommentsCount = document.querySelector('.social__comment-count');
const commentsCount = document.querySelector('.comments-count');
const COMMENTS_STEP = 5;
const moreComments = document.querySelector('.comments-loader');

const createCommentBigPicture = (commentInfo) => {
  const commentClone = commentTemplate.cloneNode(true);
  const profilPicture = commentClone.querySelector('img');
  profilPicture.src = commentInfo.avatar;
  profilPicture.alt = commentInfo.name;
  commentClone.querySelector('p').textContent = commentInfo.message;
  return commentClone;
};

const openBigPicture = () => {
  document.body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
};

const closeBigPicture = () => {
  bigPictureCloseButton.addEventListener ('click', () => {
    bigPicture.classList.add('hidden');
    document.body.classList.remove('modal-open');
    commentsOfPicture.innerHTML = '';
  });

  document.addEventListener('keydown', (evt)=> {
    if (isEscapeKey(evt)) {
      bigPicture.classList.add('hidden');
      document.body.classList.remove('modal-open');
      commentsOfPicture.innerHTML = '';
    }
  });
};

const createBigPicture = (thumbnail, likes, comments, description) => {
  bigPicture.querySelector('.big-picture__img img').src = thumbnail.querySelector('img').src;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.likes-count').textContent = likes;
  bigPicture.querySelector('.comments-count').textContent = thumbnail.querySelector('.picture__comments').textContent;
  comments.slice(0,5).forEach((comment) => {
    const newComment = createCommentBigPicture(comment);
    commentsOfPicture.append(newComment);
  });
  if (commentsCount.textContent <= COMMENTS_STEP) {
    socialCommentsCount.firstChild.textContent = ` ${commentsCount.textContent} из  `;
    moreComments.classList.add('hidden');
  } else {
    moreComments.addEventListener('click', () => {
      comments.slice(5).forEach((comment) => {
        const newComment = createCommentBigPicture(comment);
        commentsOfPicture.appendChild(newComment);
      });
    }, { once: true });
  };
  openBigPicture();
  closeBigPicture();
};

export {createBigPicture};
