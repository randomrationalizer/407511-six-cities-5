import {getCitiesFromOffers} from "./util";

describe(`Test getCitiesFromOffers function`, () => {
  it(`Should return an alphabetically sorted cities list from offers array`, () => {
    const offers = [
      {id: 1, city: {name: `Brussels`}},
      {id: 2, city: {name: `Hamburg`}},
      {id: 3, city: {name: `Amsterdam`}},
      {id: 4, city: {name: `Hamburg`}}
    ];
    const expected = [`Amsterdam`, `Brussels`, `Hamburg`];

    expect(getCitiesFromOffers(offers)).toEqual(expected);
  });
});
