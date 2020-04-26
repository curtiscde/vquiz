import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import withStyles from '@material-ui/core/styles/withStyles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import List from '@material-ui/core/List';
import CircularProgress from '@material-ui/core/CircularProgress';

import * as userActions from '../redux/actions/userActions';

const drawerWidth = 240;

const styles = (theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
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
});

const Home = ({
  checkAuthentication,
  logout,
  loadUser,
  user,
  history,
  ...props
}) => {
  const { classes } = props;

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

  function handleLogout() {
    logout();
    history.push('/login');
  }

  if (uiLoading) {
    return (
      <div className={classes.root}>
        <CircularProgress size={150} className={classes.uiProgess} />
      </div>
    );
  }

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            vquiz
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.toolbar} />
        <Divider />
        <center>
          <p>
            {' '}
            {user.profile.username}
          </p>
        </center>
        <Divider />
        <List>
          <ListItem button key="Logout" onClick={handleLogout}>
            <ListItemIcon>
              {' '}
              <ExitToAppIcon />{' '}
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItem>
        </List>
      </Drawer>

      <div>Home</div>
    </div>
  );
};

Home.propTypes = {
  checkAuthentication: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  loadUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
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
)(withStyles(styles)(Home));
