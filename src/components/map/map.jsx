import React, {PureComponent} from "react";
import PropTypes from "prop-types";
import {offersPropTypes} from "../offer/offer.prop";
import {cityPropTypes} from "../map/city.prop";
import leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import pinIcon from "../../../public/img/pin.svg";
import activePinIcon from "../../../public/img/pin-active.svg";

const ZOOM_VALUE = 12;
const pinSize = [27, 39];


class Map extends PureComponent {

  renderMap() {
    const coordinates = Object.values(this.props.city.coords);

    this.map = leaflet.map(`map`, {
      center: coordinates,
      zoom: ZOOM_VALUE,
      scrollWheelZoom: false,
      zoomControl: true,
      marker: true
    });

    this.map.setView(coordinates, ZOOM_VALUE);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this.map);
  }

  renderPins() {
    const {activeCard, offers} = this.props;

    const pin = leaflet.icon({
      iconUrl: pinIcon,
      iconSize: pinSize
    });

    const activePin = leaflet.icon({
      iconUrl: activePinIcon,
      iconSize: pinSize
    });

    offers.map((offer) => {
      if (activeCard && offer.id === activeCard.id) {
        return leaflet
          .marker(Object.values(offer.coords), {icon: activePin})
          .addTo(this.map);
      }

      return leaflet
        .marker(Object.values(offer.coords), {icon: pin})
        .addTo(this.map);
    });
  }

  componentDidMount() {
    this.renderMap();
    this.renderPins();
  }

  componentDidUpdate(prevProps) {
    if (this.props.activeCard !== prevProps.activeCard) {
      this.renderPins();
    }
  }

  componentWillUnmount() {
    this.map.remove();
    this.map = null;
  }

  render() {
    const {mapType} = this.props;

    return (
      <section className={`${mapType}__map map`}>
        <div style={{height: `100%`}} id="map"></div>
      </section>
    );
  }
}

Map.propTypes = {
  offers: PropTypes.arrayOf(offersPropTypes).isRequired,
  mapType: PropTypes.string.isRequired,
  activeCard: offersPropTypes,
  city: cityPropTypes.isRequired
};

export default Map;
