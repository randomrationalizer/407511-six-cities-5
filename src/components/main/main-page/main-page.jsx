import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import MainOffersSection from "../main-offers-section/main-offers-section";
import Header from "../../header/header";
import Preloader from "../../preloader/preloader";
import withActiveItem from "../../../hocs/with-active-item/with-active-item";
import {getAllOffersData} from "../../../store/api-actions";
import {changeLoadFinishStatus, setErrorMessage} from "../../../store/action";
import {getLoadFinishStatus, getOffersLoadedStatus} from "../../../store/selectors";

const MainOffersSectionWrapped = withActiveItem(MainOffersSection);

class MainPage extends PureComponent {

  componentDidMount() {
    const {getOffers, isOffersLoaded, setLoadError} = this.props;

    if (!isOffersLoaded) {
      getOffers()
      .catch((err) => setLoadError(err));
    }
  }

  render() {
    const {isOffersLoaded, isLoadFinished} = this.props;

    if (!isLoadFinished) {
      return <Preloader />;
    }

    return (
      <div className="page page--gray page--main">
        <Header />

        {isOffersLoaded &&
          <MainOffersSectionWrapped/>
        }
      </div>
    );
  }
}

MainPage.propTypes = {
  getOffers: PropTypes.func.isRequired,
  isOffersLoaded: PropTypes.bool.isRequired,
  isLoadFinished: PropTypes.bool.isRequired,
  setLoadError: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isOffersLoaded: getOffersLoadedStatus(state),
  isLoadFinished: getLoadFinishStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  getOffers() {
    return dispatch(getAllOffersData());
  },
  setLoadError(err) {
    dispatch(changeLoadFinishStatus(true));
    dispatch(setErrorMessage(err.message));
  }
});


export {MainPage};
export default connect(mapStateToProps, mapDispatchToProps)(MainPage);
