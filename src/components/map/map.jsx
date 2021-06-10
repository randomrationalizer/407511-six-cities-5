import React, {createRef, useEffect, useRef} from "react";
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


const Map = (props) => {
  const {offers, activeCardId, city, mapType} = props;
  const {latitude, longitude, zoom} = city.location;
  const map = useRef(null);
  const pins = useRef(leaflet.layerGroup());
  const mapRef = createRef();

  const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  };

  const prevCity = usePrevious(city);

  useEffect(() => {
    map.current = leaflet.map(mapRef.current, {
      center: [latitude, longitude],
      zoom,
      scrollWheelZoom: false,
      zoomControl: true,
      marker: true
    });
    leaflet
      .tileLayer(MAP_LAYER, {
        attribution: MAP_ATTRIBUTION
      })
      .addTo(map.current);

    return () => {
      map.current.remove();
    };
  }, []);

  useEffect(() => {
    if (prevCity) {
      map.current.setView([latitude, longitude], zoom);
    }
  }, [city]);

  useEffect(() => {
    offers.forEach((offer) => {
      const coords = [offer.location.latitude, offer.location.longitude];
      const marker = leaflet.marker(coords, {icon: offer.id === activeCardId ? activePin : pin});
      pins.current.addLayer(marker);
    });
    pins.current.addTo(map.current);

    return () => pins.current.clearLayers();
  }, [offers, activeCardId]);


  return (
    <section className={`${mapType}__map map`}>
      <div ref={mapRef} style={{height: `100%`}} id="map"></div>
    </section>
  );
};

Map.propTypes = {
  offers: PropTypes.arrayOf(offersPropTypes).isRequired,
  mapType: PropTypes.string.isRequired,
  activeCardId: PropTypes.number,
  city: cityPropTypes.isRequired
};

export default Map;
