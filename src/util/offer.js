import moment from "moment";

const MAX_RATING = 5;

export const getRatingInPercent = (ratingValue) => {
  return Math.floor(100 * ratingValue / MAX_RATING);
};

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

// Возвращает дату в виде строки в формате: 2019-04-24
export const formatDate = (date) => {
  if (!(date instanceof Date)) {
    date = new Date(date);
  }

  return moment(date).format(`YYYY-MM-DD`);
};


// Сравнение для сортировки отзывов в хронологическом порядке
const sortByDate = (first, second) => {
  if (!(first instanceof Date)) {
    first = new Date(first);
  }

  if (!(second instanceof Date)) {
    second = new Date(second);
  }
  return first.startDate.getTime() - second.startDate.getTime();
};
