import React from "react";
import {Provider} from 'react-redux';
import {mount} from "enzyme";
import {MemoryRouter} from "react-router-dom";
import {LoginPage} from "./login-page";
import store from "../../mocks/test-data/store";
import {getMockStore, noop} from "../../mocks/util";


const mockStore = getMockStore(store);


describe(`Login screen e2e testing`, () => {
  it(`should form be submitted and callback has been called with correct data`, () => {
    const handleFormSubmit = jest.fn().mockImplementation(() => Promise.resolve());
    const mockUserData = {
      email: `123@mail.ru`,
      password: `123`
    };
    const wrapper = mount(
        <Provider store={mockStore}>
          <MemoryRouter>
            <LoginPage
              onFormSubmit={handleFormSubmit}
              showErrorMessage={noop}
            />
          </MemoryRouter>
        </Provider>
    );

    const formSentPrevention = jest.fn();
    const email = wrapper.find(`input[type="email"]`);
    const password = wrapper.find(`input[type="password"]`);
    email.instance().value = `123@mail.ru`;
    password.instance().value = `123`;
    const form = wrapper.find(`form`);

    form.simulate(`submit`, {preventDefault: formSentPrevention});
    expect(handleFormSubmit).toHaveBeenCalledWith(mockUserData);
    expect(handleFormSubmit).toHaveBeenCalledTimes(1);
  });

  it(`shouldn't form be submitted and callback hasn't been called with empty email`, () => {
    const handleFormSubmit = jest.fn().mockImplementation(() => Promise.resolve());

    const wrapper = mount(
        <Provider store={mockStore}>
          <MemoryRouter>
            <LoginPage
              onFormSubmit={handleFormSubmit}
              showErrorMessage={noop}
            />
          </MemoryRouter>
        </Provider>
    );

    const formSentPrevention = jest.fn();
    const email = wrapper.find(`input[type="email"]`);
    const password = wrapper.find(`input[type="password"]`);
    email.instance().value = ``;
    password.instance().value = `123`;
    const form = wrapper.find(`form`);

    form.simulate(`submit`, {preventDefault: formSentPrevention});
    expect(handleFormSubmit).toHaveBeenCalledTimes(0);
  });

  it(`shouldn't form be submitted and callback hasn't been called with incorrect email`, () => {
    const handleFormSubmit = jest.fn().mockImplementation(() => Promise.resolve());

    const wrapper = mount(
        <Provider store={mockStore}>
          <MemoryRouter>
            <LoginPage
              onFormSubmit={handleFormSubmit}
              showErrorMessage={noop}
            />
          </MemoryRouter>
        </Provider>
    );

    const formSentPrevention = jest.fn();
    const email = wrapper.find(`input[type="email"]`);
    const password = wrapper.find(`input[type="password"]`);
    email.instance().value = `123@`;
    password.instance().value = `123`;
    const form = wrapper.find(`form`);

    form.simulate(`submit`, {preventDefault: formSentPrevention});
    expect(handleFormSubmit).toHaveBeenCalledTimes(0);
  });

  it(`shouldn't form be submitted and callback hasn't been called with empty password`, () => {
    const handleFormSubmit = jest.fn().mockImplementation(() => Promise.resolve());

    const wrapper = mount(
        <Provider store={mockStore}>
          <MemoryRouter>
            <LoginPage
              onFormSubmit={handleFormSubmit}
              showErrorMessage={noop}
            />
          </MemoryRouter>
        </Provider>
    );

    const formSentPrevention = jest.fn();
    const email = wrapper.find(`input[type="email"]`);
    const password = wrapper.find(`input[type="password"]`);
    email.instance().value = `123@mail.ru`;
    password.instance().value = ``;
    const form = wrapper.find(`form`);

    form.simulate(`submit`, {preventDefault: formSentPrevention});
    expect(handleFormSubmit).toHaveBeenCalledTimes(0);
  });

  it(`shouldn't form be submitted and callback hasn't been called without data`, () => {
    const handleFormSubmit = jest.fn().mockImplementation(() => Promise.resolve());

    const wrapper = mount(
        <Provider store={mockStore}>
          <MemoryRouter>
            <LoginPage
              onFormSubmit={handleFormSubmit}
              showErrorMessage={noop}
            />
          </MemoryRouter>
        </Provider>
    );

    const formSentPrevention = jest.fn();
    const email = wrapper.find(`input[type="email"]`);
    const password = wrapper.find(`input[type="password"]`);
    email.instance().value = ``;
    password.instance().value = ``;
    const form = wrapper.find(`form`);

    form.simulate(`submit`, {preventDefault: formSentPrevention});
    expect(handleFormSubmit).toHaveBeenCalledTimes(0);
  });
});
