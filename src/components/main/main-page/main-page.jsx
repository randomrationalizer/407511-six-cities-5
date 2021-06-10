import React, {useEffect, useMemo} from "react";
import {connect} from "react-redux";
import {compose} from "redux";
import PropTypes from "prop-types";
import MainOffersSection from "../main-offers-section/main-offers-section";
import Header from "../../header/header";
import Preloader from "../../preloader/preloader";
import withErrorMessage from "../../../hocs/with-error-message/with-error-message";
import {fetchOffers} from "../../../store/api-actions";
import {getLoadFinishStatus, getOffersLoadedStatus} from "../../../store/load-status/selectors";


const MainPage = (props) => {
  const {isOffersLoaded, isLoadFinished, getOffers, showErrorMessage} = props;
  const header = useMemo(() => <Header />, []);

  useEffect(() => {
    if (!isOffersLoaded) {
      getOffers()
        .catch((error) => showErrorMessage(error.message));
    }
  }, [isOffersLoaded]);

  if (!isLoadFinished) {
    return <Preloader />;
  }

  return (
    <div className="page page--gray page--main">
      {header}

      {isOffersLoaded &&
        <MainOffersSection/>
      }
    </div>
  );
};

MainPage.propTypes = {
  getOffers: PropTypes.func.isRequired,
  isOffersLoaded: PropTypes.bool.isRequired,
  isLoadFinished: PropTypes.bool.isRequired,
  showErrorMessage: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isOffersLoaded: getOffersLoadedStatus(state),
  isLoadFinished: getLoadFinishStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  getOffers() {
    return dispatch(fetchOffers());
  }
});


export {MainPage};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withErrorMessage
)(MainPage);
