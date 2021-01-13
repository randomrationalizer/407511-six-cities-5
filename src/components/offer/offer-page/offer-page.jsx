import React, {PureComponent} from "react";
import {withRouter} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import Header from "../../header/header";
import OfferDetails from "../offer-details/offer-details";
import Preloader from "../../preloader/preloader";
import {getOfferDetails, getPartialOfferDetails} from "../../../store/api-actions";
import {resetCurrentOffer, changeCurrentOfferLoadedStatus, setErrorMessage, loadCurrentOffer, changeLoadFinishStatus} from "../../../store/action";
import {getCurrentOfferLoadedStatus, getOffersLoadedStatus, getLoadFinishStatus} from "../../../store/selectors";
import {AppRoute, HttpCode} from "../../../const";


class OfferPage extends PureComponent {

  componentDidMount() {
    this.loadCurrentOffer();
  }

  componentDidUpdate(prevProps) {
    const {resetOffer} = this.props;
    const prevId = parseInt(prevProps.match.params.id, 10);

    if (this.id !== prevId) {
      resetOffer();
      this.loadCurrentOffer();
    }
  }

  componentWillUnmount() {
    const {resetOffer} = this.props;
    resetOffer();
  }

  handleLoadError(err) {
    const {history, setLoadError} = this.props;
    if (err.response.status === HttpCode.NOT_FOUND) {
      history.push(AppRoute.NOT_FOUND);
    } else {
      setLoadError(err);
    }
  }

  loadCurrentOffer() {
    const {isAllOffersLoaded, getPatchOfferInfo, getOfferInfo} = this.props;

    if (isAllOffersLoaded) {
      getPatchOfferInfo(this.id)
      .catch((err) => this.handleLoadError(err));
    } else {
      getOfferInfo(this.id)
      .catch((err) => this.handleLoadError(err));
    }
  }

  render() {
    const {match, isLoadFinished, isCurrentOfferLoaded} = this.props;
    this.id = parseInt(match.params.id, 10);

    if (!isLoadFinished) {
      return <Preloader />;
    }

    return (
      <div className="page">
        <Header />

        {isCurrentOfferLoaded &&
          <OfferDetails id={this.id}/>
        }

      </div>
    );
  }
}

OfferPage.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  isCurrentOfferLoaded: PropTypes.bool.isRequired,
  isLoadFinished: PropTypes.bool.isRequired,
  isAllOffersLoaded: PropTypes.bool.isRequired,
  getOfferInfo: PropTypes.func.isRequired,
  getPatchOfferInfo: PropTypes.func.isRequired,
  resetOffer: PropTypes.func.isRequired,
  setLoadError: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isCurrentOfferLoaded: getCurrentOfferLoadedStatus(state),
  isLoadFinished: getLoadFinishStatus(state),
  isAllOffersLoaded: getOffersLoadedStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  getOfferInfo(id) {
    return dispatch(getOfferDetails(id));
  },
  getPatchOfferInfo(id) {
    return dispatch(getPartialOfferDetails(id));
  },
  resetOffer() {
    dispatch(resetCurrentOffer());
    dispatch(changeCurrentOfferLoadedStatus(false));
  },
  setLoadError(err) {
    dispatch(changeLoadFinishStatus(true));
    dispatch(loadCurrentOffer({}));
    dispatch(setErrorMessage(err.message));
  }
});

export {OfferPage};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(OfferPage));

