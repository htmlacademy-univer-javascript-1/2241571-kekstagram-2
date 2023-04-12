import {createUniqueRandomId, getRandomArrayElement, getRandomNumber} from './util.js';

const DESCRIPTIONS = [
  'hi',
  'sunset',
  'night',
  'you',
  'birff',
  'stars',
  'morning',
  'happy!',
  'a wish',
  'moon',
  'food',
  'friends',
  'love',
  'what',
  'who',
  'ambition',
  'envy',
  'huh',
  'spring',
  'new year',
];
const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const NAMES = [
  'Luna',
  'Oscar',
  'Aurora',
  'Iris',
  'Cora',
  'Atlas',
  'Freya',
  'Finn',
  'Jasper',
  'Flora',
  'Dylan',
  'Orion',
  'Ariadne',
  'Astra',
  'Remus',
];
const PHOTO_COUNT = 25;
const createComment = () => {
  return {
    id: getRandomNumber(1, 600),
    avatar: 'img/avatar-' + getRandomNumber(1, 6) + '.svg',
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  };
};
const createObject = () => {
  return {
    id: getRandomNumber(1, 25),
    url: 'photos/' + getRandomNumber(1, 25),
    description: getRandomArrayElement(DESCRIPTIONS),
    likes: getRandomNumber(15, 200),
    comments: Array.from({length: 3}, createComment),
  };
};
const photoDescriptions = Array.from({length: PHOTO_COUNT}, createObject);

export {photoDescriptions, createObject};
