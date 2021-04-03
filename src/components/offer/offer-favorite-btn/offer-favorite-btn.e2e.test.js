import React from "react";
import {mount} from "enzyme";
import {MemoryRouter, Router} from "react-router-dom";
import {createMemoryHistory} from "history";
import OfferFavoriteBtn from "./offer-favorite-btn";
import {AppRoute, AuthorizationStatus, OfferPageType} from "../../../const";


describe(`Should Favorite button be pressed`, () => {
  it(`by authorized user and callback has been called`, () => {
    const handleFavoriteBtnClick = jest.fn();
    const handleChangeBtnActive = jest.fn();

    const wrapper = mount(
        <MemoryRouter>
          <OfferFavoriteBtn
            id={1}
            isActive={true}
            pageType={OfferPageType.DETAILS}
            onBtnClick={handleFavoriteBtnClick}
            onActiveChange={handleChangeBtnActive}
            authorizationStatus={AuthorizationStatus.AUTH}
            history={{}}
          />
        </MemoryRouter>
    );

    const button = wrapper.find(`button`);
    button.simulate(`click`);
    expect(handleFavoriteBtnClick).toHaveBeenCalledTimes(1);
    expect(handleChangeBtnActive).toHaveBeenCalledTimes(1);
  });

  it(`by unauthorized user and callback hasn't been called, user should be redirected to Login screen`, () => {
    const handleFavoriteBtnClick = jest.fn();
    const handleChangeBtnActive = jest.fn();
    let history = createMemoryHistory();

    const wrapper = mount(
        <Router history={history}>
          <OfferFavoriteBtn
            id={1}
            isActive={true}
            pageType={OfferPageType.DETAILS}
            onBtnClick={handleFavoriteBtnClick}
            onActiveChange={handleChangeBtnActive}
            authorizationStatus={AuthorizationStatus.NO_AUTH}
          />
        </Router>
    );

    const button = wrapper.find(`button`);
    button.simulate(`click`);
    expect(handleFavoriteBtnClick).toHaveBeenCalledTimes(0);
    expect(handleChangeBtnActive).toHaveBeenCalledTimes(0);
    expect(history.location.pathname).toBe(AppRoute.LOGIN);
  });
});
