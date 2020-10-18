import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {offersPropTypes} from "../../offers-prop-types";
import Card from "../offer-card/offer-card";
import {CardType} from "../../const";


class OffersList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeCard: this.props.offers[0]
    };
  }

  render() {
    const {offers, favorites, onOfferHover} = this.props;

    return (
      <div className="cities__places-list places__list tabs__content">
        {offers.map((offer) =>
          <Card
            key={offer.id}
            offer={offer}
            onCardHover={(newActiveCard) => {
              onOfferHover(newActiveCard);
              this.setState(() => {
                return {activeCard: newActiveCard};
              });
            }}
            activeCard={this.state.activeCard}
            cardType={CardType.MAIN}
            isFavorite={favorites.includes(offer.id)}
          />
        )}
      </div>
    );
  }
}

OffersList.propTypes = {
  offers: PropTypes.arrayOf(offersPropTypes).isRequired,
  favorites: PropTypes.array.isRequired,
  onOfferHover: PropTypes.func.isRequired,
};

export default OffersList;
