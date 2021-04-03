import React from "react";
import {Provider} from "react-redux";
import {mount} from "enzyme";
import withErrorMessage from "./with-error-message";
import ErrorMessage from "../../components/error-message/error-message";
import store from "../../mocks/test-data/store";
import {getMockStore} from "../../mocks/util";
import {NameSpace} from "../../store/reducers/root-reducer";
import {extend} from "../../utils/common";


const message = `Error`;
const MockComponent = () => <div></div>;
const MockComponentWrapped = withErrorMessage(MockComponent);

test(`Should call dispatch on a button click`, () => {
  const updatedStore = extend(store, {
    [NameSpace.LOAD_STATUS]: extend(store[NameSpace.LOAD_STATUS], {
      errorMessage: message
    })
  });
  const updatedMockStore = getMockStore(updatedStore);
  updatedMockStore.dispatch = jest.fn();

  const wrapper = mount(
      <Provider store={updatedMockStore}>
        <MockComponentWrapped />
      </Provider>
  );

  wrapper.find(ErrorMessage).props().onClose();
  expect(updatedMockStore.dispatch).toHaveBeenCalledTimes(1);
});
