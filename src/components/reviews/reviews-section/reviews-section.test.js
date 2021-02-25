import React from "react";
import renderer from "react-test-renderer";
import {Provider} from "react-redux";
import {ReviewsSection} from "./reviews-section";
import store from "../../../mocks/test-data/store";
import mockReviews from "../../../mocks/test-data/reviews";
import {getMockStore, noop} from "../../../mocks/util";
import {AuthorizationStatus} from "../../../const";


const mockStore = getMockStore(store);


describe(`Should ReviewsSection component renders correctly`, () => {
  describe(`for authorized user`, () => {
    it(`with reviews`, () => {
      const tree = renderer
        .create(
            <Provider store={mockStore}>
              <ReviewsSection
                id={1}
                offerReviews={mockReviews}
                onFormSubmit={noop}
                authorizationStatus={AuthorizationStatus.AUTH}
                setError={noop}
              />
            </Provider>
        ).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it(`without reviews`, () => {
      const tree = renderer
        .create(
            <Provider store={mockStore}>
              <ReviewsSection
                id={1}
                offerReviews={[]}
                onFormSubmit={noop}
                authorizationStatus={AuthorizationStatus.AUTH}
                setError={noop}
              />
            </Provider>
        ).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe(`for unauthorized user`, () => {
    it(`with reviews`, () => {
      const tree = renderer
        .create(
            <Provider store={mockStore}>
              <ReviewsSection
                id={1}
                offerReviews={mockReviews}
                onFormSubmit={noop}
                authorizationStatus={AuthorizationStatus.NO_AUTH}
                setError={noop}
              />
            </Provider>
        ).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it(`without reviews`, () => {
      const tree = renderer
        .create(
            <Provider store={mockStore}>
              <ReviewsSection
                id={1}
                offerReviews={[]}
                onFormSubmit={noop}
                authorizationStatus={AuthorizationStatus.NO_AUTH}
                setError={noop}
              />
            </Provider>
        ).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
