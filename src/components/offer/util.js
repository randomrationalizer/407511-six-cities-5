import dayjs from "dayjs";
import {OfferType} from "../../const";

const MAX_RATING = 5;

export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const formatDate = (date) => {
  return dayjs(date).format(`YYYY-MM-DD`);
};

export const humanizeDate = (date) => {
  return dayjs(date).format(`MMMM YYYY`);
};

export const sortByDate = (a, b) => {
  return dayjs(a.date) - dayjs(b.date);
};

export const getDescriptionSentences = (text) => {
  let description = text.split(`. `);
  description[description.length - 1] = description[description.length - 1].replace(`.`, ``);

  return description;
};

export const isFavoritesCard = (type) => {
  return type === OfferType.FAVORITES;
};

export const isMainPageCard = (type) => {
  return type === OfferType.MAIN;
};

export const getRatingInPercent = (ratingValue) => {
  return Math.floor(100 * ratingValue / MAX_RATING);
};
