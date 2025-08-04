const PHOTO_COUNT = 25;
const MIN_LIKES = 15;
const MAX_LIKES = 200;
const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;
const AVATAR_COUNT = 6;

const USER_NAMES = [
  'Иван',
  'Хуан Себастьян',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия',
  'Люпита',
  'Вашингтон',
  'Марья',
  'Верон',
  'Мирабелла',
  'Вальц',
  'Онопко',
  'Топольницкая',
  'Нионго',
  'Ирвинг',
];

const COMMENT_MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const generateUniqueNumbers = (count, startFrom = 1) => {
  const numbers = Array.from({ length: count }, (_, i) => i + startFrom);
  for (let i = numbers.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [numbers[i], numbers[j]] = [numbers[j], numbers[i]];
  }
  return numbers;
};

const generateComment = (commentId) => {
  const randomName = USER_NAMES[getRandomInteger(0, USER_NAMES.length - 1)];
  const message1 =
    COMMENT_MESSAGES[getRandomInteger(0, COMMENT_MESSAGES.length - 1)];
  const message2 =
    COMMENT_MESSAGES[getRandomInteger(0, COMMENT_MESSAGES.length - 1)];

  const message =
    Math.random() > 0.5 && message1 !== message2
      ? `${message1} ${message2}`
      : message1;

  return {
    id: commentId,
    avatar: `img/avatar-${getRandomInteger(1, AVATAR_COUNT)}.svg`,
    message,
    name: randomName,
  };
};

const uniquePhotoIds = generateUniqueNumbers(PHOTO_COUNT);
const uniquePhotoNumbers = generateUniqueNumbers(PHOTO_COUNT);

const createPhoto = (_, index) => {
  const authorName = USER_NAMES[getRandomInteger(0, USER_NAMES.length - 1)];
  const commentsCount = getRandomInteger(MIN_COMMENTS, MAX_COMMENTS);
  const commentIds = generateUniqueNumbers(commentsCount, index * 100 + 1);

  return {
    id: uniquePhotoIds[index],
    url: `photos/${uniquePhotoNumbers[index]}.jpg`,
    description: `Фотография от ${authorName}`,
    likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
    comments: Array.from({ length: commentsCount }, (_, i) =>
      generateComment(commentIds[i])
    ),
  };
};

const photoDescriptions = Array.from({ length: PHOTO_COUNT }, createPhoto);
console.log(photoDescriptions);
