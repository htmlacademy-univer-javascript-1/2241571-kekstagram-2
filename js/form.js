import { filterEditor } from './picture-effects.js';
import { sendData } from './API.js';

const effectSlider = document.querySelector('.img-upload__effect-level');
const isEscapeKey = (evt) => evt.key === 'Escape';
const formOpenButton = document.querySelector('.img-upload__label');
const uploadForm = document.querySelector('.img-upload__form');
const formCloseButton = uploadForm.querySelector('.img-upload__cancel');
const editingForm = uploadForm.querySelector('.img-upload__overlay');
const hashtags = uploadForm.querySelector('.text__hashtags');
const uploadInput = uploadForm.querySelector('.img-upload__input');
const photoComment = uploadForm.querySelector('.text__description');
const errorTemplate = document.querySelector('#error').content.querySelector('section');
const successTemplate = document.querySelector('#success').content.querySelector('section');
const submitButton = document.querySelector('.img-upload__submit');

const openFormSettings = (evt) => {
  evt.preventDefault();
  document.body.classList.add('modal-open');
  editingForm.classList.remove('hidden');
};

const closeEditingForm = () => {
  editingForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadInput.innerHTML = '';
  hashtags.value = '';
  photoComment.value = '';
  document.getElementById('effect-none').checked = true;
  slider.style.display = 'none';
};

const addHandlersToCloseForm = () => {
  formCloseButton.addEventListener ('click', () => {
    closeEditingForm();
  });

  document.addEventListener('keydown', (evt)=> {
    if (isEscapeKey(evt)) {
      closeEditingForm();
    }
  });
};

const re = /^((#[A-Za-zА-Яа-яЁё0-9]{1,19})\s*|)+$$/;
const MAX_COMMENT_LENGTH = 5;

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper__error-text'
});

const validateHashtagsValue = () => re.test(hashtags.value);

const validateHashtagsSimilar = () => {
  const hashtagsList = hashtags.value.split(' ');
  const newHashtagsList = [];

  hashtagsList.forEach((hashtag) => {
    newHashtagsList.push(hashtag.toLowerCase());
  });

  const unique = Array.from(new Set(newHashtagsList));
  return (unique.length === newHashtagsList.length);
};

const validateHashtagsMax = () => {
  const hashtagsList = hashtags.value.split(' ');
  return !((hashtagsList.length > MAX_COMMENT_LENGTH));
};

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Отправляю...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Сохранить';
};

const showMessage = (template) => {
  const message = template.cloneNode(true);
  const removeErrorMessage = () => {
    document.body.removeChild(message);
  };

  const windowRemove = () => {
    removeErrorMessage();
    document.removeEventListener('keydown', escRemove);
  };

  function escRemove(evt) {
    if (message.parentNode) {
      if (isEscapeKey(evt)) {
        window.removeEventListener('click', windowRemove);
        removeErrorMessage();
      }}
  }

  document.body.append(message);
  window.addEventListener('click', windowRemove, {once: true});

  message.querySelector('div').addEventListener('click', (evt) => {
    evt.stopPropagation();
  });

  message.querySelector('.error__button').addEventListener('click', () => {
    removeErrorMessage();
    window.removeEventListener('click', windowRemove);
    document.removeEventListener('keydown', escRemove);
  });

  document.addEventListener('keydown', escRemove, {once: true});
  unblockSubmitButton();
};

const closeSuccesForm = () => {
  showMessage(successTemplate);
  closeEditingForm();
};

const closeErrorForm = () => {
  editingForm.classList.add('hidden');
  document.body.classList.remove('modal-open');
  showMessage(errorTemplate);
};

const validateForm = () => {
  pristine.addValidator(hashtags, validateHashtagsValue, 'Неверно введенный хэш-тег');
  pristine.addValidator(hashtags, validateHashtagsSimilar, 'Вижу одинаковые хэш-теги');
  pristine.addValidator(hashtags, validateHashtagsMax, 'Превышен максимальный лимит хэш-тегов');

  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      const formData = new FormData(evt.target);
      sendData(closeSuccesForm, closeErrorForm, formData);
    }
  });
};

const openForm = () => {
  formOpenButton.addEventListener('click', openFormSettings);

  hashtags.addEventListener('keydown', (evt) => {
    evt.stopPropagation();
  });
  photoComment.addEventListener('keydown', (evt) => {
    evt.stopPropagation();
  });

  addHandlersToCloseForm();
  validateForm();
  filterEditor();
};

export{openForm};
