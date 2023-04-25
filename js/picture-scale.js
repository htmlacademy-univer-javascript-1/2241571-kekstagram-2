const photoSmaller = document.querySelector('.scale__control--smaller');
const photoBigger = document.querySelector('.scale__control--bigger');
const sizeValue = document.querySelector('.scale__control--value');
const imgPreview = document.querySelector('.img-upload__preview');
const SIZE_STEP = 25;
const SIZE_MAX = 100;
const SIZE_MIN = 25;

const sizeRestrictions = (num) => {
  if (num >= SIZE_MAX) {
    sizeValue.value = '100%'
    imgPreview.style.transform = 'scale(1.0)';
  }
  if (num <= SIZE_MIN) {
    sizeValue.value = '25%';
    imgPreview.style.transform = 'scale(0.25)';
  }
};

photoBigger.addEventListener('click', (evt) => {
  let sizeValueNumber = parseInt(sizeValue.value.slice(-4, -1));
  let newSize = sizeValueNumber + SIZE_STEP;
  sizeValue.value = newSize + '%';
  imgPreview.style.transform = 'scale(' + newSize/100 + ')';
  sizeRestrictions(newSize);
});

photoSmaller.addEventListener('click', (evt) => {
  let sizeValueNumber = parseInt(sizeValue.value.slice(-4, -1));
  let newSize = sizeValueNumber - SIZE_STEP;
  sizeValue.value = newSize + '%';
  imgPreview.style.transform = 'scale(' + newSize/100 + ')';
  sizeRestrictions(newSize);
});
