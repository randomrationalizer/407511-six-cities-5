import React, {createRef, useMemo} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {compose} from "redux";
import Header from "../header/header";
import CityLink from "../cities/city-link/city-link";
import withErrorMessage from "../../hocs/with-error-message/with-error-message";
import {login} from "../../store/api-actions";
import {CityLinkType} from "../../const";


const EMAIL_REGEXP = /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

const LoginPage = ({onFormSubmit, showErrorMessage}) => {
  const loginRef = createRef();
  const passwordRef = createRef();
  const header = useMemo(() => <Header />, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if (EMAIL_REGEXP.test(loginRef.current.value) && passwordRef.current.value) {
      onFormSubmit({
        email: loginRef.current.value,
        password: passwordRef.current.value
      })
        .catch((err) => showErrorMessage(err.message));
    }
  };

  return (
    <div className="page page--gray page--login">
      {header}

      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form
              className="login__form form"
              action=""
              method="post"
              onSubmit={handleSubmit}
            >
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <input
                  ref={loginRef}
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <input
                  ref={passwordRef}
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">Sign in</button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <CityLink
                linkType={CityLinkType.INNER_PAGE}
                city={`Amsterdam`}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

LoginPage.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  showErrorMessage: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  onFormSubmit(authData) {
    return dispatch(login(authData));
  }
});

export {LoginPage};
export default compose(
    connect(null, mapDispatchToProps),
    withErrorMessage
)(LoginPage);
