import {KeyCode} from "../const";

export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const checkKeyDownEvent = (evt, action, args) => {
  if (evt.keyCode === KeyCode.ENTER || evt.keyCode === KeyCode.SPACE) {
    action(args);
  }
};

export const pluralize = (word, count) => {
  return count === 1 ? word : `${word}s`;
};
