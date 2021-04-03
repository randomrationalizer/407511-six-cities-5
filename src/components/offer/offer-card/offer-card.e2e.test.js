import React from "react";
import {Provider} from 'react-redux';
import {MemoryRouter} from "react-router-dom";
import {mount} from "enzyme";
import OfferCard from "./offer-card";
import store from "../../../mocks/test-data/store";
import mockCurrentOffer from "../../../mocks/test-data/current-offer";
import {getMockStore} from "../../../mocks/util";
import {OfferType} from "../../../const";


const mockStore = getMockStore(store);


describe(`OfferCard e2e testing`, () => {
  it(`should mouse enter the card and callback has been called with card id`, () => {
    const handleCardHover = jest.fn();
    const offerType = OfferType.MAIN;
    const wrapper = mount(
        <Provider store={mockStore}>
          <MemoryRouter>
            <OfferCard
              onCardHover={handleCardHover}
              offer={mockCurrentOffer}
              offerType={offerType}
            />
          </MemoryRouter>
        </Provider>
    );

    const card = wrapper.find(`article`);
    card.simulate(`mouseenter`);
    expect(handleCardHover).toHaveBeenCalledTimes(1);
    expect(handleCardHover).toHaveBeenCalledWith(mockCurrentOffer.id);
  });

  it(`should mouse leave the card and callback has been called with null`, () => {
    const handleCardHover = jest.fn();
    const offerType = OfferType.MAIN;
    const wrapper = mount(
        <Provider store={mockStore}>
          <MemoryRouter>
            <OfferCard
              onCardHover={handleCardHover}
              offer={mockCurrentOffer}
              offerType={offerType}
            />
          </MemoryRouter>
        </Provider>
    );

    const card = wrapper.find(`article`);
    card.simulate(`mouseleave`);
    expect(handleCardHover).toHaveBeenCalledTimes(1);
    expect(handleCardHover).toHaveBeenCalledWith(null);
  });
});
