import React, {PureComponent} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import UserNav from "../../user-menu/user-nav/user-nav";
import FavoritesList from "../favorites-list/favorites-list";
import {fetchFavoriteOffers} from "../../../store/api-actions";
import {getFavoritesLoadStatus} from "../../../store/selectors";
import logo from "../../../../public/img/logo.svg";


class Favorites extends PureComponent {

  componentDidMount() {
    const {getFavoriteOffers} = this.props;
    getFavoriteOffers();
  }

  render() {
    const {isLoaded} = this.props;

    return (
      <div className="page">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <Link className="header__logo-link" to="/">
                  <img className="header__logo" src={logo} alt="6 cities logo" width="81" height="41" />
                </Link>
              </div>
              <UserNav />
            </div>
          </div>
        </header>

        <main className="page__main page__main--favorites">
          <div className="page__favorites-container container">
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              {isLoaded ?
                <FavoritesList />
                :
                <p>Loading...</p>
              }
            </section>
          </div>
        </main>
        <footer className="footer container">
          <Link className="footer__logo-link" to="/">
            <img className="footer__logo" src={logo} alt="6 cities logo" width="64" height="33" />
          </Link>
        </footer>
      </div>
    );
  }
}

Favorites.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  getFavoriteOffers: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isLoaded: getFavoritesLoadStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  getFavoriteOffers() {
    dispatch(fetchFavoriteOffers());
  }
});


export {Favorites};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
