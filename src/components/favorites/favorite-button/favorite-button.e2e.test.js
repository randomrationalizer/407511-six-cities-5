import React from "react";
import {Provider} from 'react-redux';
import {mount} from "enzyme";
import {FavoriteButton} from "./favorite-button";
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
    const handleFavoriteButtonClick = jest.fn(() => Promise.resolve());

    const wrapper = mount(
        <Provider store={mockStore}>
          <FavoriteButton
            id={mockId}
            isActive={false}
            pageType={OfferPageType.DETAILS}
            changeStatus={handleFavoriteButtonClick}
            authorizationStatus={AuthorizationStatus.AUTH}
            showErrorMessage={noop}
          />
        </Provider>
    );

    const button = wrapper.find(`button`);
    button.simulate(`click`);
    setTimeout(() => {
      expect(handleFavoriteButtonClick).toHaveBeenCalledTimes(1);
      expect(handleFavoriteButtonClick).toHaveBeenCalledWith(mockId, 1);
      expect(mockSetState).toHaveBeenCalledTimes(1);
      expect(mockSetState).toHaveBeenCalledWith(true);
    }, 1);
  });

  it(`by unauthorized user and callback hasn't been called, user should be redirected to Login screen`, () => {
    jest.resetAllMocks();
    const handleFavoriteButtonClick = jest.fn();

    const wrapper = mount(
        <Provider store={mockStore}>
          <FavoriteButton
            id={1}
            isActive={false}
            pageType={OfferPageType.DETAILS}
            changeStatus={handleFavoriteButtonClick}
            authorizationStatus={AuthorizationStatus.NO_AUTH}
            showErrorMessage={noop}
          />
        </Provider>
    );

    const button = wrapper.find(`button`);
    button.simulate(`click`);
    expect(handleFavoriteButtonClick).toHaveBeenCalledTimes(0);
    expect(mockSetState).toHaveBeenCalledTimes(0);
    expect(mockHistoryPush).toHaveBeenCalledTimes(1);
    expect(mockHistoryPush).toHaveBeenCalledWith(AppRoute.LOGIN);
  });
});
