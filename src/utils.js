export const extend = (a, b) => {
  return Object.assign({}, a, b);
};

export const isEnterEvent = (evt, action, args) => {
  if (evt.key === `Enter`) {
    action(args);
  }
};
