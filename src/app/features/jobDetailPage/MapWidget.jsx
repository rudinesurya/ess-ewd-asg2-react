import GoogleMapReact from 'google-map-react';
import PropTypes from 'prop-types';
import React from 'react';
import { Icon, Segment } from 'semantic-ui-react';

const AnyReactComponent = ({ text }) => <div>{text}</div>;
const Marker = () => <Icon name="marker" size="big" color="red" />;

const MapWidget = ({ lat, lng }) => {
  const center = [lat, lng];
  const zoom = 15;

  return (
    <Segment attached="bottom">
      <div style={{ height: '300px', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyC_Ac73QDNznSmARX5A9WXzu9ho14t_tsA' }}
          defaultCenter={center}
          defaultZoom={zoom}
        >
          <AnyReactComponent
            lat={lat}
            lng={lng}
            text="My Marker"
          />

          <Marker lat={lat} lng={lng} />
        </GoogleMapReact>
      </div>
    </Segment>
  );
};

MapWidget.propTypes = {
  lat: PropTypes.number.isRequired,
  lng: PropTypes.number.isRequired,
};

export default MapWidget;
