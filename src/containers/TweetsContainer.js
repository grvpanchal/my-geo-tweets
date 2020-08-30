/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import * as tweetsAction from '../actions/tweetsAction';
import * as searchFormAction from '../actions/searchFormAction';

import TweetBody from '../components/TweetBody';
import SimpleMap from '../components/SimpleMap';
import DynamicViewWrapper from '../components/DynamicViewWrapper';
import GeoTweetsForm from '../components/GeoTweetsForm';

const styles = () => ({
  spacedPagination: {
    margin: '3rem auto',
  },
  paper: {
    textAlign: 'center',
  },
  fullHeight: {
    height: '80vh',
    width: '100%',
    overflow: 'auto',
  },
});
class TweetsContainer extends Component {
  componentDidMount() {
    const { getTweets } = this.props;
    getTweets();
  }

  updateSearchFormParams = (payload) => {
    const { setLoading, updateSearchForm } = this.props;
    setLoading();
    updateSearchForm(payload);
  }

  render() {
    const {
      tweets,
      classes,
      searchForm,
    } = this.props;

    const { lat, lng } = searchForm.location;
    return (
      <main>
        <GeoTweetsForm updateSearchForm={this.updateSearchFormParams} />
        <Grid container spacing={3}>
          <Grid item md={7}>
            <Paper className={classes.paper}>
              <SimpleMap center={{ lat, lng }} />
            </Paper>
          </Grid>
          <Grid item md={5}>
            <div className={classes.fullHeight}>
              <DynamicViewWrapper
                isLoading={tweets.isLoading}
                loader={(<CircularProgress />)}
                error={tweets.error}
              >
                {tweets.statuses && tweets.statuses.length ? tweets.statuses.map((status) => (<TweetBody key={status.id} {...status} />)) : 'No Results'}
              </DynamicViewWrapper>
            </div>
          </Grid>
        </Grid>
      </main>
    );
  }
}

TweetsContainer.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  getTweets: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  updateSearchForm: PropTypes.func.isRequired,
  searchForm: PropTypes.shape({
    location: PropTypes.shape({
      lat: PropTypes.number.isRequired,
      lng: PropTypes.number.isRequired,
    }).isRequired,
    query: PropTypes.string.isRequired,
  }).isRequired,
  tweets: PropTypes.shape({
    isLoading: PropTypes.bool,
    statuses: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number,
        title: PropTypes.string,
        body: PropTypes.string,
        userId: PropTypes.number,
      }),
    ),
    error: PropTypes.string,
  }),
};

TweetsContainer.defaultProps = {
  tweets: {
    isLoading: false,
    statuses: [],
    error: '',
  },
};

const mapStateToProps = ({ tweets, searchForm }) => ({
  tweets,
  searchForm,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getTweets: tweetsAction.getTweets,
  setLoading: tweetsAction.setLoading,
  updateSearchForm: searchFormAction.updateSearchForm,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(TweetsContainer));
