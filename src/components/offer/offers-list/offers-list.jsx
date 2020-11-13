import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {offersPropTypes} from "../offer.prop";
import Card from "../offer-card/offer-card";
import {OfferType} from "../../../const";


class OffersList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      activeCard: null
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
            cardType={OfferType.MAIN}
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
