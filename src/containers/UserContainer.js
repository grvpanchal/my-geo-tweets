/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import CircularProgress from '@material-ui/core/CircularProgress';
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';
import TwitterLogin from 'react-twitter-auth';

import config from '../config';

import * as userAction from '../actions/userAction';
import * as searchFormAction from '../actions/searchFormAction';

import DynamicViewWrapper from '../components/DynamicViewWrapper';

const styles = () => ({
  loginContainer: {
    margin: '10rem auto',
  },
});
class UserContainer extends Component {
  componentDidMount() {
    const { getUserSession } = this.props;
    getUserSession();
  }

  onSuccess = (response) => {
    let userData;
    response.json().then((user) => {
      if (response.headers.get('x-auth-token')) {
        userData = { user };
        const { setUser } = this.props;
        setUser({ userData }, response);
      }
    });
  };

  onFailed = (error) => {
    const { getUserSessionError } = this.props;
    getUserSessionError(error);
  };

  logout = () => {
    const { removeUser } = this.props;
    removeUser();
  };

  render() {
    const {
      user,
      classes,
    } = this.props;

    return (
      <main>
        <DynamicViewWrapper
          isLoading={user.isLoading}
          loader={(<CircularProgress />)}
          error={user.error}
        >
          <Grid container justify="center">
            <TwitterLogin
              className={classes.loginContainer}
              loginUrl={`${config.apiEndpoint}/api/v1/auth/twitter`}
              onFailure={this.onFailed}
              onSuccess={this.onSuccess}
              requestTokenUrl={`${config.apiEndpoint}/api/v1/auth/twitter/reverse`}
            />
          </Grid>
        </DynamicViewWrapper>
      </main>
    );
  }
}

UserContainer.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  getUserSession: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
  getUserSessionError: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
  user: PropTypes.shape({
    isLoading: PropTypes.bool,
    userData: PropTypes.objectOf(
      PropTypes.shape({
        _id: PropTypes.string,
        email: PropTypes.string,
      }),
    ),
    error: PropTypes.string,
  }),
};

UserContainer.defaultProps = {
  user: {
    isLoading: false,
    userData: {},
    error: '',
  },
};

const mapStateToProps = ({ tweets }) => ({
  tweets,
});

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getUserSession: userAction.getUserSession,
  getUserSessionError: userAction.getUserSessionError,
  setUser: userAction.setUser,
  removeUser: userAction.removeUser,
  updateSearchForm: searchFormAction.updateSearchForm,
}, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(UserContainer));
