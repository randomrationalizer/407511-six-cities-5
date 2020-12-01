import React, {PureComponent} from "react";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import UserNav from "../../user-menu/user-nav/user-nav";
import {getOfferDetails} from "../../../store/api-actions";
import {getCurrentOfferLoadStatus} from "../../../store/selectors";
import OfferDetails from "../offer-details/offer-details";
import logo from "../../../../public/img/logo.svg";


class OfferPage extends PureComponent {

  componentDidMount() {
    const {getOfferInfo} = this.props;
    getOfferInfo(this.id);
  }

  componentDidUpdate() {
    const {getOfferInfo} = this.props;
    getOfferInfo(this.id);
  }

  render() {
    const {isLoaded} = this.props;
    this.id = this.props.id;

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

        {isLoaded ?
          <OfferDetails
            id={this.id}
          />
          :
          <p>Loading...</p>
        }
      </div>
    );
  }
}

OfferPage.propTypes = {
  id: PropTypes.number.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  getOfferInfo: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  isLoaded: getCurrentOfferLoadStatus(state)
});

const mapDispatchToProps = (dispatch) => ({
  getOfferInfo(id) {
    dispatch(getOfferDetails(id));
  }
});

export {OfferPage};
export default connect(mapStateToProps, mapDispatchToProps)(OfferPage);

