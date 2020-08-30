/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

export default class LocationSearchBox extends Component {
  constructor(props) {
    super(props);
    this.textRef = React.createRef();
    this.state = {
      locationQuery: 'Portland',
    };
  }

  componentDidMount() {
    if (typeof google === 'undefined') {
      console.warn('Google Places was not initialized. LocationSearchBox will not function.');
      return;
    }

    const { country, onPlaceChanged } = this.props;
    const { places } = window.google.maps;

    let options;

    if (country) {
      options = {
        componentRestrictions: { country },
      };
    }

    const input = this.textRef.current;

    if (input) {
      input.setAttribute('placeholder', '');

      if (!input._autocomplete) {
        input._autocomplete = new places.Autocomplete(input, options);

        input._autocomplete.addListener('place_changed', (() => {
          if (onPlaceChanged) {
            this.setState({ locationQuery: input._autocomplete.getPlace().name });
            onPlaceChanged(input._autocomplete.getPlace());
          }
          // eslint-disable-next-line no-extra-bind
        }).bind(input._autocomplete));
      }
    }
  }

  render() {
    const { locationQuery } = this.state;
    return (
      <span>
        <TextField
          label="Location"
          value={locationQuery}
          onChange={(e) => this.setState({ locationQuery: e.target.value })}
          inputRef={this.textRef}
          variant="outlined"
          fullWidth
        />
      </span>
    );
  }
}

LocationSearchBox.propTypes = {
  onPlaceChanged: PropTypes.func.isRequired,
  country: PropTypes.string,
};

LocationSearchBox.defaultProps = {
  country: '',
};
