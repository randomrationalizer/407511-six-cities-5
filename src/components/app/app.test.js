import React from "react";
import {Provider} from 'react-redux';
import {Router} from "react-router-dom";
import renderer from "react-test-renderer";
import {mount} from "enzyme";
import {createMemoryHistory} from "history";
import {App} from "./app";
import OfferPage from "../offer/offer-page/offer-page";
import NotFoundPage from "../not-found-page/not-found-page";
import store from "../../mocks/test-data/store";
import {NameSpace} from "../../store/root-reducer";
import {getMockStore, noop, nope} from "../../mocks/util";
import {extend} from "../../utils/common";
import {AppRoute, AuthorizationStatus} from "../../const";


jest.mock(`../map/map`, () => () => `Map`);
let history;
const mockStore = getMockStore(store);
const updatedStore = extend(store, {
  [NameSpace.USER]: extend(store[NameSpace.USER], {
    authorizationStatus: AuthorizationStatus.NO_AUTH
  }),
  [NameSpace.LOAD_STATUS]: extend(store[NameSpace.LOAD_STATUS], {
    isOffersLoaded: false
  })
});
const updatedMockStore = getMockStore(updatedStore);

describe(`Should <App /> renders correctly`, () => {
  it(`if load is finished`, () => {
    history = createMemoryHistory();
    const tree = renderer
      .create(
          <Provider store={mockStore}>
            <Router history={history}>
              <App
                checkAuthorization={nope}
                setAuthRequestComplete={noop}
                isAuthRequestComplete={true}
              />
            </Router>
          </Provider>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });

  it(`with spinner if load is not finshed`, () => {
    history = createMemoryHistory();
    const tree = renderer
      .create(
          <Provider store={mockStore}>
            <Router history={history}>
              <App
                checkAuthorization={nope}
                setAuthRequestComplete={noop}
                isAuthRequestComplete={false}
              />
            </Router>
          </Provider>
      ).toJSON();

    expect(tree).toMatchSnapshot();
  });
});

describe(`Test App routing`, () => {
  beforeEach(() => {
    history = createMemoryHistory();
  });

  it(`render Main page when user navigate to "/" url`, () => {
    history.push(AppRoute.MAIN);

    mount(
        <Provider store={mockStore}>
          <Router history={history}>
            <App
              checkAuthorization={nope}
              setAuthRequestComplete={noop}
              isAuthRequestComplete={true}
            />
          </Router>
        </Provider>
    );

    expect(history.location.pathname).toBe(AppRoute.MAIN);
  });

  it(`should render Favorites page when authorized user navigate to "/favorite" url`, () => {
    history.push(AppRoute.FAVORITES);

    mount(
        <Provider store={mockStore}>
          <Router history={history}>
            <App
              checkAuthorization={nope}
              setAuthRequestComplete={noop}
              isAuthRequestComplete={true}
            />
          </Router>
        </Provider>
    );

    expect(history.location.pathname).toBe(AppRoute.FAVORITES);
  });

  it(`should render Login component when unauthorized user navigate to "/favorite" url`, () => {
    history.push(AppRoute.FAVORITES);

    mount(
        <Provider store={updatedMockStore}>
          <Router history={history}>
            <App
              checkAuthorization={nope}
              setAuthRequestComplete={noop}
              isAuthRequestComplete={true}
            />
          </Router>
        </Provider>
    );

    expect(history.location.pathname).toBe(AppRoute.LOGIN);
  });

  it(`should render Login page when unauthorized user navigate to "/login" url`, () => {
    history.push(AppRoute.LOGIN);

    mount(
        <Provider store={updatedMockStore}>
          <Router history={history}>
            <App
              checkAuthorization={nope}
              setAuthRequestComplete={noop}
              isAuthRequestComplete={true}
            />
          </Router>
        </Provider>
    );

    expect(history.location.pathname).toBe(AppRoute.LOGIN);
  });

  it(`should render Main page when authorized user navigate to "/login" url`, () => {
    history.push(AppRoute.LOGIN);

    mount(
        <Provider store={mockStore}>
          <Router history={history}>
            <App
              checkAuthorization={nope}
              setAuthRequestComplete={noop}
              isAuthRequestComplete={true}
            />
          </Router>
        </Provider>
    );

    expect(history.location.pathname).toBe(AppRoute.MAIN);
  });

  it(`should render Offer page when user navigate to "/hotels/:id" url`, () => {
    const id = 1;
    updatedMockStore.dispatch = nope;
    history.push(`${AppRoute.OFFERS}/${id}`);

    const wrapper = mount(
        <Provider store={updatedMockStore}>
          <Router history={history}>
            <App
              checkAuthorization={nope}
              setAuthRequestComplete={noop}
              isAuthRequestComplete={true}
            />
          </Router>
        </Provider>
    );

    expect(history.location.pathname).toBe(`${AppRoute.OFFERS}/${id}`);
    expect(wrapper.exists(OfferPage)).toBe(true);
  });

  it(`should render NotFound page when user navigate to unexisting url`, () => {
    history.push(`/monkeytyping`);

    const wrapper = mount(
        <Provider store={mockStore}>
          <Router history={history}>
            <App
              checkAuthorization={nope}
              setAuthRequestComplete={noop}
              isAuthRequestComplete={true}
            />
          </Router>
        </Provider>
    );

    expect(wrapper.exists(NotFoundPage)).toBe(true);
  });
});
