import moment from "moment";
import {MAX_RATING} from "../const";


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

// Возвращает дату в виде строки в формате: January 2020
export const humanizeDate = (date) => {
  return moment(date).format(`MMMM YYYY`);
};

// Сравнение для сортировки отзывов в хронологическом порядке
export const sortByDate = (a, b) => {
  let first = a.date;
  let second = b.date;

  if (!(first instanceof Date)) {
    first = new Date(first);
  }

  if (!(second instanceof Date)) {
    second = new Date(second);
  }
  return first.getTime() - second.getTime();
};

export const getDescriptionSentences = (text) => {
  let description = text.split(`. `);
  description[description.length - 1] = description[description.length - 1].replace(`.`, ``);

  return description;
};
