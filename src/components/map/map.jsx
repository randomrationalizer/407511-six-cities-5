import React, {createRef, PureComponent} from "react";
import PropTypes from "prop-types";
import {offersPropTypes} from "../offer/offer.prop";
import {cityPropTypes} from "../cities/city.prop";
import leaflet from "leaflet";
import "leaflet/dist/leaflet.css";
import pinIcon from "../../../public/img/pin.svg";
import activePinIcon from "../../../public/img/pin-active.svg";

const MAP_LAYER = `https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`;
const MAP_ATTRIBUTION = `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`;
const pinSize = [27, 39];

const pin = leaflet.icon({
  iconUrl: pinIcon,
  iconSize: pinSize
});

const activePin = leaflet.icon({
  iconUrl: activePinIcon,
  iconSize: pinSize
});


class OffersMap extends PureComponent {
  constructor(props) {
    super(props);

    this.mapRef = createRef();
  }

  componentDidMount() {
    this.renderMapLayer();
    this.renderPins();
  }

  componentDidUpdate(prevProps) {
    const {activeCardId, city} = this.props;

    if (activeCardId !== prevProps.activeCardId) {
      this.updatePin(prevProps.activeCardId);
      this.updatePin(activeCardId);
    }

    if (city.name !== prevProps.city.name) {
      this.removePins();
      this.updateMapLayer();
      this.renderPins();
    }
  }

  componentWillUnmount() {
    this.removePins();
    this.removeMapLayer();
  }

  renderMapLayer() {
    const {latitude, longitude, zoom} = this.props.city.location;
    const coordinates = [latitude, longitude];

    this.map = leaflet.map(this.mapRef.current, {
      center: coordinates,
      zoom,
      scrollWheelZoom: false,
      zoomControl: true,
      marker: true
    });

    leaflet
      .tileLayer(MAP_LAYER, {
        attribution: MAP_ATTRIBUTION
      })
      .addTo(this.map);
  }

  renderPins() {
    const {activeCardId, offers} = this.props;
    this.pins = new Map();
    offers.forEach((offer) => {
      const coords = [offer.location.latitude, offer.location.longitude];
      const marker = leaflet.marker(coords, {icon: offer.id === activeCardId ? activePin : pin});
      this.pins.set(offer.id, {
        offerMarker: marker,
        coords
      });
      marker.addTo(this.map);
    });
  }

  updatePin(pinId) {
    const {activeCardId} = this.props;

    if (pinId) {
      const marker = this.pins.get(pinId);
      this.map.removeLayer(marker.offerMarker);
      const updatedPin = leaflet.marker(marker.coords, {icon: pinId === activeCardId ? activePin : pin});
      this.pins.set(pinId, Object.assign(marker, {offerMarker: updatedPin}));
      updatedPin.addTo(this.map);
    }
  }

  updateMapLayer() {
    const {latitude, longitude, zoom} = this.props.city.location;
    const coordinates = [latitude, longitude];
    this.map.setView(coordinates, zoom);
  }

  removePins() {
    for (const marker of this.pins.values()) {
      this.map.removeLayer(marker.offerMarker);
    }
    this.pins.clear();
  }

  removeMapLayer() {
    this.map.remove();
    this.map = null;
  }

  render() {
    const {mapType} = this.props;

    return (
      <section className={`${mapType}__map map`}>
        <div ref={this.mapRef} style={{height: `100%`}} id="map"></div>
      </section>
    );
  }
}

OffersMap.propTypes = {
  offers: PropTypes.arrayOf(offersPropTypes).isRequired,
  mapType: PropTypes.string.isRequired,
  activeCardId: PropTypes.number,
  city: cityPropTypes.isRequired
};

export default OffersMap;
