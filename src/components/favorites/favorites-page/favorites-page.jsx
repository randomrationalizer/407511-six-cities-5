import React, {PureComponent} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {offersPropTypes} from "../../offer/offer.prop";
import UserNav from "../../user-menu/user-nav/user-nav";
import FavoritesList from "../favorites-list/favorites-list";
import FavoritesEmptyList from "../favorites-empty-list/favorites-empty-list";
import Preloader from "../../preloader/preloader";
import {changeLoadFinishStatus, loadFavoriteOffers, setErrorMessage} from "../../../store/action";
import {fetchFavoriteOffers} from "../../../store/api-actions";
import {getFavoritesLoadedStatus, getFavorites, getLoadFinishStatus} from "../../../store/selectors";
import logo from "../../../../public/img/logo.svg";


class Favorites extends PureComponent {

  componentDidMount() {
    const {isFavoritesLoaded, getFavoriteOffers, setLoadError} = this.props;

    if (!isFavoritesLoaded) {
      getFavoriteOffers()
      .catch((err) => setLoadError(err));
    }
  }

  render() {
    const {isLoadFinished, isFavoritesLoaded, favorites} = this.props;


    if (!isLoadFinished) {
      return <Preloader />;
    }

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

        {!isFavoritesLoaded || !favorites.length ?
          <FavoritesEmptyList />
          :
          <FavoritesList favorites={favorites} />
        }

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
  isFavoritesLoaded: PropTypes.bool.isRequired,
  isLoadFinished: PropTypes.bool.isRequired,
  getFavoriteOffers: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(offersPropTypes),
  setLoadError: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isFavoritesLoaded: getFavoritesLoadedStatus(state),
  isLoadFinished: getLoadFinishStatus(state),
  favorites: getFavorites(state)
});

const mapDispatchToProps = (dispatch) => ({
  getFavoriteOffers() {
    return dispatch(fetchFavoriteOffers());
  },
  setLoadError(err) {
    dispatch(changeLoadFinishStatus(true));
    dispatch(loadFavoriteOffers([]));
    dispatch(setErrorMessage(err.message));
  }
});


export {Favorites};
export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
