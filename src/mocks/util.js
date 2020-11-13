const DESCRIPTION_MOCK = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras aliquet varius magna, non porta ligula feugiat eget. Fusce tristique felis at fermentum pharetra. Aliquam id orci ut lectus varius viverra. Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante. Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum. Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui. Sed sed nisi sed augue convallis suscipit in sed felis. Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus. In rutrum ac purus sit amet tempus.`;

const MAX_SENTENCES_COUNT = 4;
const MAX_RATING = 5;

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

export const getPhoto = () => {
  return `http://picsum.photos/248/152?r=${Math.random()}`;
};

export const generateDescription = () => {
  let sentences = DESCRIPTION_MOCK.split(`. `);

  sentences[sentences.length - 1] = sentences[sentences.length - 1].replace(`.`, ``);

  const sentencesCount = getRandomInteger(1, MAX_SENTENCES_COUNT);

  const description = new Array(sentencesCount).fill().map(() => {
    const randomIndex = getRandomInteger(0, sentences.length - 1);
    return sentences.splice(randomIndex, 1) + `.`;
  }).join(` `);

  return description;
};

export const getRatingInPercent = (ratingValue) => {
  return Math.floor(100 * ratingValue / MAX_RATING);
};
