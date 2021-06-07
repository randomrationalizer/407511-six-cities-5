import React from "react";
import renderer from "react-test-renderer";
import {ReviewsSection} from "./reviews-section";
import mockReviews from "../../../mocks/test-data/reviews";
import {noop} from "../../../mocks/util";
import {AuthorizationStatus} from "../../../const";


describe(`Should ReviewsSection component renders correctly`, () => {
  describe(`for authorized user`, () => {
    it(`with reviews`, () => {
      const tree = renderer
        .create(
            <ReviewsSection
              id={1}
              reviews={mockReviews}
              onFormSubmit={noop}
              authorizationStatus={AuthorizationStatus.AUTH}
              showErrorMessage={noop}
            />

        ).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it(`without reviews`, () => {
      const tree = renderer
        .create(
            <ReviewsSection
              id={1}
              reviews={[]}
              onFormSubmit={noop}
              authorizationStatus={AuthorizationStatus.AUTH}
              showErrorMessage={noop}
            />
        ).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe(`for unauthorized user`, () => {
    it(`with reviews`, () => {
      const tree = renderer
        .create(
            <ReviewsSection
              id={1}
              reviews={mockReviews}
              onFormSubmit={noop}
              authorizationStatus={AuthorizationStatus.NO_AUTH}
              showErrorMessage={noop}
            />
        ).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it(`without reviews`, () => {
      const tree = renderer
        .create(
            <ReviewsSection
              id={1}
              reviews={[]}
              onFormSubmit={noop}
              authorizationStatus={AuthorizationStatus.NO_AUTH}
              showErrorMessage={noop}
            />
        ).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
