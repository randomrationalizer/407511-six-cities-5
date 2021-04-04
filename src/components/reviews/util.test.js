import {checkCommentValidity, checkRatingValidity} from "./util";


describe(`Test checkCommentValidity function`, () => {
  it(`Should return true if comment is valid`, () => {
    const comment = `What an amazing view! The house is stunning and in an amazing location. The large glass wall had an amazing view of the river!`;
    expect(checkCommentValidity(comment)).toBe(true);
  });

  it(`Should return false if comment is shorter than 50 symbols`, () => {
    const comment = `What an amazing view?`;
    expect(checkCommentValidity(comment)).toBe(false);
  });

  it(`Should return false if comment is longer than 500 symbols`, () => {
    const comment = `What an amazing view! The house is stunning and in an amazing location. The large glass wall had an amazing view of the river! What an amazing view! The house is stunning and in an amazing location. The large glass wall had an amazing view of the river! What an amazing view! The house is stunning and in an amazing location. The large glass wall had an amazing view of the river!`;
    expect(checkCommentValidity(comment)).toBe(false);
  });
});

describe(`Test checkRatingValidity function`, () => {
  it(`Should return true if rating is valid`, () => {
    const rating = 5;
    expect(checkRatingValidity(rating)).toBe(true);
  });

  it(`Should return false if rating is greater than 5`, () => {
    const rating = 6;
    expect(checkRatingValidity(rating)).toBe(false);
  });

  it(`Should return false if rating value is less than 5`, () => {
    const rating = 0;
    expect(checkRatingValidity(rating)).toBe(false);
  });
});
