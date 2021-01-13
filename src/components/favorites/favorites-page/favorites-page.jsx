import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {offersPropTypes} from "../../offer/offer.prop";
import Header from "../../header/header";
import FavoritesList from "../favorites-list/favorites-list";
import FavoritesEmptyList from "../favorites-empty-list/favorites-empty-list";
import Footer from "../../footer/footer";
import Preloader from "../../preloader/preloader";
import {changeLoadFinishStatus, loadFavoriteOffers, setErrorMessage} from "../../../store/action";
import {fetchFavoriteOffers} from "../../../store/api-actions";
import {getFavoritesLoadedStatus, getFavorites, getLoadFinishStatus} from "../../../store/selectors";


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
        <Header />

        {!isFavoritesLoaded || !favorites.length ?
          <FavoritesEmptyList />
          :
          <FavoritesList favorites={favorites} />
        }

        <Footer />
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
