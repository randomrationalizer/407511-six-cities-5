import React, {useEffect, useMemo} from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {compose} from "redux";
import {offersPropTypes} from "../../offer/offer.prop";
import Header from "../../header/header";
import FavoritesList from "../favorites-list/favorites-list";
import Footer from "../../footer/footer";
import Preloader from "../../preloader/preloader";
import withErrorMessage from "../../../hocs/with-error-message/with-error-message";
import {fetchFavoriteOffers} from "../../../store/api-actions";
import {getFavoritesLoadedStatus, getLoadFinishStatus} from "../../../store/load-status/selectors";
import {getFavorites} from "../../../store/user/selectors";
import FavoritesEmptyList from "../favorites-empty-list/favorites-empty-list";


const FavoritesPage = (props) => {
  const {isFavoritesLoaded, isLoadFinished, getFavoriteOffers, favorites, showErrorMessage} = props;
  const header = useMemo(() => <Header />, []);
  const footer = useMemo(() => <Footer />, []);

  useEffect(() => {
    if (!isFavoritesLoaded) {
      getFavoriteOffers()
        .catch((err) => {
          showErrorMessage(err.message);
        });
    }
  }, []);

  if (!isLoadFinished) {
    return <Preloader />;
  }

  return (
    <div className="page">
      {header}

      {!isFavoritesLoaded || !favorites.length ?
        <FavoritesEmptyList />
        :
        <FavoritesList favorites={favorites} />
      }

      {footer}
    </div>
  );
};

FavoritesPage.propTypes = {
  isFavoritesLoaded: PropTypes.bool.isRequired,
  isLoadFinished: PropTypes.bool.isRequired,
  getFavoriteOffers: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(offersPropTypes),
  showErrorMessage: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isFavoritesLoaded: getFavoritesLoadedStatus(state),
  isLoadFinished: getLoadFinishStatus(state),
  favorites: getFavorites(state)
});

const mapDispatchToProps = (dispatch) => ({
  getFavoriteOffers() {
    return dispatch(fetchFavoriteOffers());
  }
});


export {FavoritesPage};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withErrorMessage
)(FavoritesPage);
