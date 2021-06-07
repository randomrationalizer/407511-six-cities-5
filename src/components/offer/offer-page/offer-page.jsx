import React, {useEffect, useMemo} from "react";
import {useHistory, useParams} from "react-router-dom";
import PropTypes from "prop-types";
import {offersPropTypes} from "../offer.prop";
import {connect} from "react-redux";
import {compose} from "redux";
import Header from "../../header/header";
import OfferDetails from "../offer-details/offer-details";
import Preloader from "../../preloader/preloader";
import withErrorMessage from "../../../hocs/with-error-message/with-error-message";
import {fetchOffer} from "../../../store/api-actions";
import {resetCurrentOffer} from "../../../store/current-offer/action";
import {getLoadFinishStatus} from "../../../store/load-status/selectors";
import {getCurrentOffer} from "../../../store/current-offer/selectors";
import {AppRoute, HttpCode} from "../../../const";


const OfferPage = (props) => {
  const {isLoadFinished, offer, getOfferInfo, resetOffer, showErrorMessage} = props;
  let {id} = useParams();
  id = parseInt(id, 10);
  const history = useHistory();
  const header = useMemo(() => <Header />, []);

  useEffect(() => {
    getOfferInfo(id)
      .catch((err) => {
        if (err.response && err.response.status === HttpCode.NOT_FOUND) {
          history.push(AppRoute.NOT_FOUND);
        } else {
          showErrorMessage(err.message);
        }
      });

    return () => resetOffer();
  }, [id]);

  if (!isLoadFinished) {
    return <Preloader />;
  }

  return (
    <div className="page">
      {header}

      {offer &&
        <OfferDetails />
      }
    </div>
  );
};

OfferPage.propTypes = {
  isLoadFinished: PropTypes.bool.isRequired,
  getOfferInfo: PropTypes.func.isRequired,
  resetOffer: PropTypes.func.isRequired,
  offer: offersPropTypes,
  showErrorMessage: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  offer: getCurrentOffer(state),
  isLoadFinished: getLoadFinishStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  getOfferInfo(id) {
    return dispatch(fetchOffer(id));
  },
  resetOffer() {
    dispatch(resetCurrentOffer());
  }
});

export {OfferPage};
export default compose(
    connect(mapStateToProps, mapDispatchToProps),
    withErrorMessage
)(OfferPage);
