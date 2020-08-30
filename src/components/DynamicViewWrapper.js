import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core';

const styles = () => ({
  spacer: {
    padding: '2rem',
  },
});
class DynamicViewWrapper extends Component {
  conditionalRender() {
    const {
      isLoading, loader, error, children, classes,
    } = this.props;
    if (isLoading) {
      return (<Grid container className={classes.spacer} justify="center">{loader}</Grid>);
    }
    if (error) {
      return (<Grid container className={classes.spacer} justify="center">{error}</Grid>);
    }

    return <>{children}</>;
  }

  render() {
    return (
      <div>
        {this.conditionalRender()}
      </div>
    );
  }
}

DynamicViewWrapper.propTypes = {
  classes: PropTypes.instanceOf(Object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  loader: PropTypes.element,
  children: PropTypes.node,
};

DynamicViewWrapper.defaultProps = {
  children: <>No Content</>,
  error: 'Something Went Wrong!!!',
  loader: <>Loading...</>,
};

export default withStyles(styles)(DynamicViewWrapper);
