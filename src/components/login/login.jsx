import React, {PureComponent, createRef} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Header from "../header/header";
import CityLink from "../cities/city-link/city-link";
import {login} from "../../store/api-actions";
import {setErrorMessage} from "../../store/action";
import {CityLinkType} from "../../const";


class LoginPage extends PureComponent {
  constructor(props) {
    super(props);

    this.loginRef = createRef();
    this.passwordRef = createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    const {onFormSubmit, setLoginError} = this.props;
    evt.preventDefault();

    onFormSubmit({
      email: this.loginRef.current.value,
      password: this.passwordRef.current.value
    })
      .catch((err) => setLoginError(err));
  }

  render() {
    return (
      <div className="page page--gray page--login">
        <Header />

        <main className="page__main page__main--login">
          <div className="page__login-container container">
            <section className="login">
              <h1 className="login__title">Sign in</h1>
              <form
                className="login__form form"
                action=""
                method="post"
                onSubmit={this.handleSubmit}
              >
                <div className="login__input-wrapper form__input-wrapper">
                  <label className="visually-hidden">E-mail</label>
                  <input
                    ref={this.loginRef}
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
                    ref={this.passwordRef}
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
  }
}

LoginPage.propTypes = {
  onFormSubmit: PropTypes.func.isRequired,
  setLoginError: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  onFormSubmit(authData) {
    return dispatch(login(authData));
  },
  setLoginError(err) {
    dispatch(setErrorMessage(err.message));
  }
});

export {LoginPage};
export default connect(null, mapDispatchToProps)(LoginPage);
