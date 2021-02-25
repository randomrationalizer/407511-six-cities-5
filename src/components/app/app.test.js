import React from "react";
import {Provider} from 'react-redux';
import renderer from "react-test-renderer";
import {App} from "./app";
import store from "../../mocks/test-data/store";
import {getMockStore, noop, nope} from "../../mocks/util";


jest.mock(`../map/map`, () => () => `Map`);
const mockStore = getMockStore(store);


it(`Should <App /> renders correctly`, () => {
  const tree = renderer
    .create(
        <Provider store={mockStore}>
          <App
            checkAuthorization={nope}
            setAuthRequestComplete={noop}
          />
        </Provider>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
