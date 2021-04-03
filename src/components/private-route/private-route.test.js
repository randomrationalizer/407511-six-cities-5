import React from "react";
import {Provider} from 'react-redux';
import {Route, Router} from "react-router-dom";
import {mount} from "enzyme";
import {createMemoryHistory} from "history";
import PrivateRoute from "./private-route";
import store from "../../mocks/test-data/store";
import {getMockStore} from "../../mocks/util";
import {AppRoute, AuthorizationStatus} from "../../const";
import {extend} from "../../utils/common";
import {NameSpace} from "../../store/reducers/root-reducer";


let history;
const mockStore = getMockStore(store);
const updatedStore = extend(store, {
  [NameSpace.USER]: extend(store[NameSpace.USER], {
    authorizationStatus: AuthorizationStatus.NO_AUTH
  })
});
const updatedMockStore = getMockStore(updatedStore);


describe(`Testing PrivateRoute component`, () => {
  describe(`for /favorite route:`, () => {
    beforeEach(() => {
      history = createMemoryHistory();
      history.push(AppRoute.FAVORITES);
    });

    it(`should render Login component if user is not authenticated`, () => {
      const wrapper = mount(
          <Provider store={updatedMockStore}>
            <Router history={history}>
              <Route exact path={AppRoute.LOGIN}><h1>Login Page</h1></Route>
              <PrivateRoute
                exact={true}
                path={AppRoute.FAVORITES}
                render={() => (
                  <h1>Favorites Page</h1>
                )}
              />
            </Router>
          </Provider>
      );

      expect(wrapper.text()).toEqual(`Login Page`);
    });

    it(`should render Favorites component if user is authenticated`, () => {
      const wrapper = mount(
          <Provider store={mockStore}>
            <Router history={history}>
              <Route exact path={AppRoute.LOGIN}><h1>Login Page</h1></Route>
              <PrivateRoute
                exact={true}
                path={AppRoute.FAVORITES}
                render={() => (
                  <h1>Favorites Page</h1>
                )}
              />
            </Router>
          </Provider>
      );

      expect(wrapper.text()).toEqual(`Favorites Page`);
    });
  });

  describe(`for /login route:`, () => {
    beforeEach(() => {
      history = createMemoryHistory();
      history.push(AppRoute.LOGIN);
    });

    it(`should render Login component if user is not authenticated`, () => {
      const wrapper = mount(
          <Provider store={updatedMockStore}>
            <Router history={history}>
              <Route exact path={AppRoute.MAIN}><h1>Main Page</h1></Route>
              <PrivateRoute
                exact={true}
                path={AppRoute.LOGIN}
                render={() => (
                  <h1>Login Page</h1>
                )}
              />
            </Router>
          </Provider>
      );

      expect(wrapper.text()).toEqual(`Login Page`);
    });

    it(`should render MainPage component if user is authenticated`, () => {
      const wrapper = mount(
          <Provider store={mockStore}>
            <Router history={history}>
              <Route exact path={AppRoute.MAIN}><h1>Main Page</h1></Route>
              <PrivateRoute
                exact={true}
                path={AppRoute.LOGIN}
                render={() => (
                  <h1>Login Page</h1>
                )}
              />
            </Router>
          </Provider>
      );

      expect(wrapper.text()).toEqual(`Main Page`);
    });
  });
});
