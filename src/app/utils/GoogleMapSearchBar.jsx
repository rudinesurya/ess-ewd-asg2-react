import PropTypes from 'prop-types';
import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import { Form, Label, Segment } from 'semantic-ui-react';

/**
 * Component for rendering GoogleMap SearchBar
 */
class GoogleMapSearchBar extends React.Component {
  state = {
    address: null,
  };

  handleChange = (address) => {
    this.setState({ address });
  };

  handleSelect = (value) => {
    this.setState({
      address: value,
    });
    this.props.onSelect(value);
  };

  render() {
    const {
      label,
      input,
      width,
      placeholder,
      searchOptions,
      meta: { touched, error },
    } = this.props;

    return (
      <React.Fragment>

        <Form.Field error={touched && !!error} width={width}>
          <label>{label}</label>
          <PlacesAutocomplete
            inputProps={{ ...input, placeholder }}
            value={this.state.address === null ? input.value : this.state.address}
            onChange={this.handleChange}
            onSelect={this.handleSelect}
            searchOptions={searchOptions}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps }) => (
              <div>
                <input
                  {...getInputProps({
                    placeholder,
                  })}
                />
                <Segment.Group suggestions={suggestions}>
                  {suggestions.map(suggestion => (
                    <Segment {...getSuggestionItemProps(suggestion)}>
                      {suggestion.description}
                    </Segment>
                  ))}
                </Segment.Group>
              </div>
            )}
          </PlacesAutocomplete>

          {touched && error && (<Label basic color="red">{error}</Label>
          )}
        </Form.Field>
      </React.Fragment>

    );
  }
}

GoogleMapSearchBar.propTypes = {
  input: PropTypes.any,
  onSelect: PropTypes.any,
  placeholder: PropTypes.any,
  searchOptions: PropTypes.any,
  width: PropTypes.any,
};

export default GoogleMapSearchBar;
