import React, {PureComponent} from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {offersPropTypes} from "../offer/offer.prop";
import {cityPropTypes} from "../cities/city.prop";
import Map from "../map/map";
import {OfferType} from "../../const";
import OffersList from "../offer/offers-list/offers-list";
import CitiesList from "../cities/cities-list/cities-list";
import Sort from "../sort/sort-section/sort-section";
import {ActionCreator} from "../../store/action";
import {MapType} from "../../const";
import logo from "../../../public/img/logo.svg";


class Main extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeCard: null
    };

    this.handleOfferHover = this.handleOfferHover.bind(this);
  }

  handleOfferHover(card) {
    this.setState({
      activeCard: card
    });
  }

  render() {
    const {favorites, cities, currentCity, cityOffers, onCurrentCityChange, currentSort, onCurrentSortChange} = this.props;

    return (
      <div className="page page--gray page--main">
        <header className="header">
          <div className="container">
            <div className="header__wrapper">
              <div className="header__left">
                <a className="header__logo-link header__logo-link--active">
                  <img className="header__logo" src={logo} alt="6 cities logo" width="81" height="41" />
                </a>
              </div>
              <nav className="header__nav">
                <ul className="header__nav-list">
                  <li className="header__nav-item user">
                    <a className="header__nav-link header__nav-link--profile" href="#">
                      <div className="header__avatar-wrapper user__avatar-wrapper">
                      </div>
                      <span className="header__user-name user__name">Oliver.conner@gmail.com</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </header>

        <main className="page__main page__main--index">
          <h1 className="visually-hidden">Cities</h1>
          <div className="tabs">
            <section className="locations container">
              <CitiesList
                cities={cities}
                currentCity={currentCity}
                onCityChange={onCurrentCityChange}
              />
            </section>
          </div>
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{cityOffers.length} places to stay in {currentCity.name}</b>
                <Sort
                  currentSort={currentSort}
                  onSortChange={onCurrentSortChange}
                />
                <div className="cities__places-list places__list tabs__content">
                  <OffersList
                    offers={cityOffers}
                    favorites={favorites}
                    onOfferHover={this.handleOfferHover}
                    offerType={OfferType.MAIN}
                  />
                </div>
              </section>
              <div className="cities__right-section">
                <Map
                  offers={cityOffers}
                  activeCard={this.state.activeCard}
                  mapType={MapType.MAIN}
                  city={currentCity}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
    );
  }
}

Main.propTypes = {
  favorites: PropTypes.array.isRequired,
  cities: PropTypes.arrayOf(cityPropTypes).isRequired,
  currentCity: cityPropTypes.isRequired,
  cityOffers: PropTypes.arrayOf(offersPropTypes).isRequired,
  onCurrentCityChange: PropTypes.func.isRequired,
  currentSort: PropTypes.string.isRequired,
  onCurrentSortChange: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  currentCity: state.currentCity,
  cityOffers: state.cityOffers,
  cities: state.cities,
  currentSort: state.currentSort
});

const mapDispatchToProps = (dispatch) => ({
  onCurrentCityChange(city) {
    dispatch(ActionCreator.changeCity(city));
    dispatch(ActionCreator.getCityOffers());
  },
  onCurrentSortChange(sort) {
    dispatch(ActionCreator.changeSort(sort));
    dispatch(ActionCreator.getCityOffers());
  }
});

export {Main};
export default connect(mapStateToProps, mapDispatchToProps)(Main);
