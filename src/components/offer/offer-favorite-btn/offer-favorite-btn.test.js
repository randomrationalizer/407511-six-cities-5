import React from "react";
import {BrowserRouter, MemoryRouter} from "react-router-dom";
import renderer from "react-test-renderer";
import OfferFavoriteBtn from "./offer-favorite-btn";
import {AuthorizationStatus, OfferPageType} from "../../../const";
import {noop} from "../../../mocks/util";


describe(`Should OfferFavoriteBtn component renders correctly`, () => {
  describe(`with active state`, () => {
    it(`for property page`, () => {
      const tree = renderer
        .create(
            <BrowserRouter>
              <OfferFavoriteBtn
                id={1}
                isActive={true}
                pageType={OfferPageType.DETAILS}
                onBtnClick={noop}
                onActiveChange={noop}
                authorizationStatus={AuthorizationStatus.AUTH}
                history={{}}
              />
            </BrowserRouter>
        ).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it(`for offer card`, () => {
      const tree = renderer
        .create(
            <BrowserRouter>
              <OfferFavoriteBtn
                id={1}
                isActive={true}
                pageType={OfferPageType.CARD}
                onBtnClick={noop}
                onActiveChange={noop}
                authorizationStatus={AuthorizationStatus.AUTH}
                history={{}}
              />
            </BrowserRouter>
        ).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });

  describe(`with inactive state`, () => {
    it(`for property page`, () => {
      const tree = renderer
        .create(
            <BrowserRouter>
              <OfferFavoriteBtn
                id={1}
                isActive={false}
                pageType={OfferPageType.DETAILS}
                onBtnClick={noop}
                onActiveChange={noop}
                authorizationStatus={AuthorizationStatus.AUTH}
                history={{}}
              />
            </BrowserRouter>
        ).toJSON();

      expect(tree).toMatchSnapshot();
    });

    it(`for offer card`, () => {
      const tree = renderer
        .create(
            <MemoryRouter>
              <OfferFavoriteBtn
                id={1}
                isActive={false}
                pageType={OfferPageType.CARD}
                onBtnClick={noop}
                onActiveChange={noop}
                authorizationStatus={AuthorizationStatus.AUTH}
                history={{}}
              />
            </MemoryRouter>
        ).toJSON();

      expect(tree).toMatchSnapshot();
    });
  });
});
