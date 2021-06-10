import React from "react";
import {Provider} from "react-redux";
import renderer from "react-test-renderer";
import FavoriteButton from "./favorite-button";
import {OfferPageType} from "../../../const";
import {getMockStore, noop} from "../../../mocks/util";
import store from "../../../mocks/test-data/store";


const mockStore = getMockStore(store);

jest.mock(`react-router`, () => (Object.assign({},
    jest.requireActual(`react-router-dom`),
    {
      useHistory: () => {},
      useLocation: () => {}
    }
)));

describe(`Should FavoriteButton component renders correctly`, () => {
  describe(`with active state`, () => {
    it(`for property page`, () => {
      const tree = renderer
        .create(
            <Provider store={mockStore}>
              <FavoriteButton
                id={1}
                isActive={true}
                pageType={OfferPageType.DETAILS}
                showErrorMessage={noop}
              />
            </Provider>
        ).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it(`for offer card`, () => {
      const tree = renderer
        .create(
            <Provider store={mockStore}>
              <FavoriteButton
                id={1}
                isActive={true}
                pageType={OfferPageType.CARD}
                showErrorMessage={noop}
              />
            </Provider>
        ).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe(`with inactive state`, () => {
    it(`for property page`, () => {
      const tree = renderer
      .create(
          <Provider store={mockStore}>
            <FavoriteButton
              id={1}
              isActive={false}
              pageType={OfferPageType.DETAILS}
              showErrorMessage={noop}
            />
          </Provider>
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it(`for offer card`, () => {
      const tree = renderer
      .create(
          <Provider store={mockStore}>
            <FavoriteButton
              id={1}
              isActive={false}
              pageType={OfferPageType.CARD}
              showErrorMessage={noop}
            />
          </Provider>
      ).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
