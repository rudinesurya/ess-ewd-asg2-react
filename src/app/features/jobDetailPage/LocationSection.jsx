import PropTypes from 'prop-types';
import React from 'react';
import { Label } from 'semantic-ui-react';
import MapWidget from './MapWidget';


const LocationSection = ({ venueName, lat, lng }) => (
  <React.Fragment>
    <MapWidget lat={lat} lng={lng} />
    <Label>{venueName}</Label>
  </React.Fragment>

);

LocationSection.propTypes = {
  venueName: PropTypes.string,
  lat: PropTypes.number,
  lng: PropTypes.number,
};

export default LocationSection;
