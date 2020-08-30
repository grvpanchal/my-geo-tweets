import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import LocationSearchBox from './LocationSearchBox';

export default class GeoTweetsForm extends Component {
  constructor() {
    super();
    this.state = {
      location: {
        // Test location if Google Maps API Key doesnt work
        lat: 45.51,
        lng: -122.67,
      },
      query: 'Hello',
    };
  }

    handleLocationChange = (place) => {
      this.setState({
        location: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        },
      });
    }

    handleQueryChange = (event) => {
      this.setState({ query: event.target.value });
    }

    handleSubmit = (event) => {
      // Make a network call somewhere
      event.preventDefault();
      const { location, query } = this.state;
      const { updateSearchForm } = this.props;
      updateSearchForm({ location, query });
    }

    render() {
      const { query, location } = this.state;
      return (
        <form onSubmit={this.handleSubmit}>
          <Grid container style={{ margin: '1rem auto' }} spacing={3}>
            <Grid item md={7}>
              <LocationSearchBox location={location} onPlaceChanged={this.handleLocationChange} />
            </Grid>
            <Grid item md={3}>
              <TextField label="Query" value={query} onChange={this.handleQueryChange} variant="outlined" fullWidth />
            </Grid>
            <Grid item md={2}>
              <Button type="submit" variant="outlined" color="primary" style={{ height: '56px' }} fullWidth>Search</Button>
            </Grid>
          </Grid>
        </form>
      );
    }
}

GeoTweetsForm.propTypes = {
  updateSearchForm: PropTypes.func.isRequired,
};
