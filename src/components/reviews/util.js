const REVIEW_MIN_LENGTH = 50;
const REVIEW_MAX_LENGTH = 300;
const RATING_MIN = 1;
const RATING_MAX = 5;

export const checkCommentValidity = (comment) => {
  return comment.length >= REVIEW_MIN_LENGTH && comment.length <= REVIEW_MAX_LENGTH ? true : false;
};

export const checkRatingValidity = (rating) => {
  return rating >= RATING_MIN && rating <= RATING_MAX ? true : false;
};
