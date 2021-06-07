import React from "react";
import {Provider} from 'react-redux';
import {mount} from "enzyme";
import {OfferFavoriteBtn} from "./offer-favorite-btn";
import store from "../../../mocks/test-data/store";
import {getMockStore, noop} from "../../../mocks/util";
import {AppRoute, AuthorizationStatus, OfferPageType} from "../../../const";

const mockId = 1;
const mockStore = getMockStore(store);
const mockHistoryPush = jest.fn();
const mockSetState = jest.fn();

jest.mock(`react-router-dom`, () => (Object.assign({},
    jest.requireActual(`react-router-dom`),
    {
      useHistory: () => ({
        push: mockHistoryPush,
      }),
    }
)));

jest.mock(`react`, () => (Object.assign({},
    jest.requireActual(`react`),
    {
      useState: (initial) => [initial, mockSetState]
    }
)));

describe(`Should Favorite button be pressed`, () => {
  it(`by authorized user and callback has been called`, () => {
    const handleFavoriteBtnClick = jest.fn(() => Promise.resolve());

    const wrapper = mount(
        <Provider store={mockStore}>
          <OfferFavoriteBtn
            id={mockId}
            isActive={false}
            pageType={OfferPageType.DETAILS}
            changeStatus={handleFavoriteBtnClick}
            authorizationStatus={AuthorizationStatus.AUTH}
            showErrorMessage={noop}
          />
        </Provider>
    );

    const button = wrapper.find(`button`);
    button.simulate(`click`);
    setTimeout(() => {
      expect(handleFavoriteBtnClick).toHaveBeenCalledTimes(1);
      expect(handleFavoriteBtnClick).toHaveBeenCalledWith(mockId, 1);
      expect(mockSetState).toHaveBeenCalledTimes(1);
      expect(mockSetState).toHaveBeenCalledWith(true);
    }, 1);
  });

  it(`by unauthorized user and callback hasn't been called, user should be redirected to Login screen`, () => {
    jest.resetAllMocks();
    const handleFavoriteBtnClick = jest.fn();

    const wrapper = mount(
        <Provider store={mockStore}>
          <OfferFavoriteBtn
            id={1}
            isActive={false}
            pageType={OfferPageType.DETAILS}
            changeStatus={handleFavoriteBtnClick}
            authorizationStatus={AuthorizationStatus.NO_AUTH}
            showErrorMessage={noop}
          />
        </Provider>
    );

    const button = wrapper.find(`button`);
    button.simulate(`click`);
    expect(handleFavoriteBtnClick).toHaveBeenCalledTimes(0);
    expect(mockSetState).toHaveBeenCalledTimes(0);
    expect(mockHistoryPush).toHaveBeenCalledTimes(1);
    expect(mockHistoryPush).toHaveBeenCalledWith(AppRoute.LOGIN);
  });
});
