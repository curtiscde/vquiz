import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import * as userActions from '../redux/actions/userActions';

const useStyles = makeStyles((theme) => ({
  appBar: {
    [theme.breakpoints.up('sm')]: {
      zIndex: theme.zIndex.drawer + 1,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  drawerCloseButton: {
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  avatar: {
    height: 110,
    width: 100,
    flexShrink: 0,
    flexGrow: 0,
    marginTop: 20,
  },
  uiProgess: {
    position: 'fixed',
    zIndex: '1000',
    height: '31px',
    width: '31px',
    left: '50%',
    top: '35%',
  },
  toolbar: theme.mixins.toolbar,
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

  function handleDrawerOpen() {
    // setDrawerOpen(true);
  }

  if (uiLoading) {
    return (
      <div className={classes.root}>
        <CircularProgress size={150} className={classes.uiProgess} />
      </div>
    );
  }

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton onClick={handleDrawerOpen} className={classes.menuButton}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            vquiz
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

Home.propTypes = {
  checkAuthentication: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ user: state.user });

const mapDispatchToProps = {
  checkAuthentication: userActions.checkAuthentication,
  logout: userActions.logout,
  loadUser: userActions.loadUser,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
