import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import * as userActions from '../redux/actions/userActions';

const useStyles = makeStyles(() => ({
  uiProgess: {
    position: 'fixed',
    zIndex: '1000',
    height: '31px',
    width: '31px',
    left: '50%',
    top: '35%',
  },
}));

const Home = ({
  checkAuthentication,
  loadUser,
  user,
  history,
}) => {
  const classes = useStyles();

  const [uiLoading, setUiLoading] = useState(true);

  useEffect(() => {
    if (!user.isAuthenticated) {
      checkAuthentication();
      history.push('/login');
    } else {
      loadUser(user.token);
      setUiLoading(false);
    }
  }, [user.isAuthenticated]);

  if (uiLoading) {
    return (
      <div className={classes.root}>
        <CircularProgress size={150} className={classes.uiProgess} />
      </div>
    );
  }

  return (
    <>
    </>
  );
};

Home.propTypes = {
  checkAuthentication: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ user: state.user });

const mapDispatchToProps = {
  checkAuthentication: userActions.checkAuthentication,
  loadUser: userActions.loadUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
