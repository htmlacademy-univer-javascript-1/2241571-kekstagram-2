const effectButtons = document.querySelectorAll('.effects__radio');
const imagePreview = document.querySelector('.img-upload__preview');
const sliderElement = document.querySelector('.effect-level');
const effectValue = document.querySelector('.effect-level__value');
const effectSlider = document.querySelector('.img-upload__effect-level');

effectValue.value = 100;

/*const effects = {
  none: {
    effect: '',
    minValue: 0,
    maxValue: 100,
    step: '',
    filter: '',
    measurement: ''
  },
  chrome: {
    effect: 'chrome',
    minValue: 0,
    maxValue: 1,
    step: '0.1',
    filter: 'grayscale',
    measurement: ''
  },
  sepia: {
    effect: 'sepia',
    minValue: 0,
    maxValue: 1,
    step: '0.1',
    filter: 'sepia',
    measurement: ''
  },
  marvin: {
    effect: 'marvin',
    minValue: 0,
    maxValue: 100,
    step: '1',
    filter: 'invert',
    measurement: '%'
  },
  phobos: {
    effect: 'phobos',
    minValue: 0,
    maxValue: 3,
    step: '0.1',
    filter: 'blur',
    measurement: 'px'
  },
  heat: {
    effect: 'heat',
    minValue: 0,
    maxValue: 3,
    step: '0.1',
    filter: 'brightness',
    measurement: ''
  }
}*/
const effects = {
  none: [0, 100, 1, '', ''],
  chrome: [0, 1, 0.1, 'grayscale', ''],
  sepia: [0, 1, 0.1, 'sepia', ''],
  marvin: [0, 100, 1, 'invert', '%'],
  phobos: [0, 3, 0.1, 'blur', 'px'],
  heat: [0, 3, 0.1, 'brightness', '']
};

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
});

const filterOptions = (filterName, filterInfo) => {
  effectSlider.style.display = 'block';
  imagePreview.classList.add(`effects__preview--${filterName}`);

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: filterInfo[0],
      max: filterInfo[1],
    },
    start: filterInfo[1],
    step: filterInfo[2],
  });

  if (filterName !== 'none') {
    imagePreview.style.filter = `${filterInfo[3]}(${filterInfo[1] + filterInfo[4]})`;
  }

  sliderElement.noUiSlider.on('update', () => {
    effectValue.value = sliderElement.noUiSlider.get();
    imagePreview.style.filter = `${filterInfo[3]}(${effectValue.value + filterInfo[4]})`;
  });
};

const filterEditor = () => {
  effectButtons.forEach((effectButton) => {
    effectButton.addEventListener('change', () => {
      imagePreview.classList = ['img-upload__preview'];
      const filterName = effectButton.value;
      filterOptions(filterName, effects[filterName]);
      if (imagePreview.classList.contains('effects__preview--none')) {
        effectSlider.style.display = 'none';
        imagePreview.style.filter = '';
      }
    });
  });
};

export {filterEditor, effectSlider};
