import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';

import config from '../config';

const MapMarker = ({ img }) => <div><img src={img} alt="Marker" /></div>;

class SimpleMap extends Component {
  render() {
    const { center, zoom, defaultCenter } = this.props;
    return (
      // Important! Always set the container height explicitly
      <div style={{ height: '80vh', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: config.googleMapsKey }}
          defaultCenter={defaultCenter}
          center={center}
          defaultZoom={zoom}
        >
          <MapMarker
            lat={center.lat}
            lng={center.lng}
            img="/twitter-icon.png"
          />
        </GoogleMapReact>
      </div>
    );
  }
}

MapMarker.propTypes = {
  img: PropTypes.string.isRequired,
};
SimpleMap.propTypes = {
  defaultCenter: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number,
  }),
  center: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lng: PropTypes.number.isRequired,
  }).isRequired,
  zoom: PropTypes.number,
};
SimpleMap.defaultProps = {
  defaultCenter: {
    lat: 45.51,
    lng: -122.67,
  },
  zoom: 11,
};

export default SimpleMap;
