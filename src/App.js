/* eslint-disable no-alert */
import React, { Component } from 'react';
import { Helmet } from 'react-helmet';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';
import withStyles from '@material-ui/core/styles/withStyles';

import config from './config';
import Header from './components/Header';
import PostsContainer from './containers/TweetsContainer';
import UserContainer from './containers/UserContainer';

const styles = () => ({
  maxContainerWidth: {
    maxWidth: '960px',
  },
});
class App extends Component {
  render() {
    const { header, classes, user } = this.props;
    const { isAuthenticated } = user;

    return (
      <Container className={classes.maxContainerWidth}>
        <Helmet>
          <meta charSet="utf-8" />
          <title>{header.title}</title>
          <script src={`https://maps.googleapis.com/maps/api/js?key=${config.googleMapsKey}&libraries=places`} />
        </Helmet>
        {isAuthenticated ? (
          <div>
            <Header title={header.title} />
            <PostsContainer />
          </div>
        ) : (<UserContainer />)}
      </Container>
    );
  }
}

App.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  header: PropTypes.shape({
    title: PropTypes.string,
  }),
  user: PropTypes.shape({
    isAuthenticated: PropTypes.bool.isRequired,
  }).isRequired,
};

App.defaultProps = {
  header: {
    title: 'My Geo Tweets',
  },
};

const mapStateToProps = ({ header, tweets, user }) => ({
  header,
  tweets,
  user,
});

export default connect(mapStateToProps)(withStyles(styles)(App));
