import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import withWidth from '@material-ui/core/withWidth';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from '@material-ui/core/Divider';

import * as userActions from '../redux/actions/userActions';

import SideBarContents from './SideBarContents';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  drawerHeader: {
    [theme.breakpoints.up('sm')]: {
      ...theme.mixins.toolbar,
    },
  },
  drawerPaper: {
    width: drawerWidth,
  },
}));

const SideBar = ({
  sideBarOpen,
  onCloseSideBar,
  user,
  logout,
  width,
}) => {
  const classes = useStyles();

  const [isPermanentDrawer, setIsPermanentDrawer] = useState(false);

  useEffect(() => {
    setIsPermanentDrawer(width !== 'xs');
  }, [width]);

  const handleLogout = () => {
    logout();
  };

  return (
    <Drawer
      className={classes.drawer}
      open={sideBarOpen}
      variant={isPermanentDrawer ? 'permanent' : null}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        {
          !isPermanentDrawer
          && <IconButton onClick={onCloseSideBar} className={classes.drawerCloseButton}>
            <ChevronLeftIcon />
          </IconButton>
        }
      </div>
      <Divider />
      <SideBarContents user={user} handleLogout={handleLogout} />
    </Drawer>
  );
};

SideBar.propTypes = {
  sideBarOpen: PropTypes.bool.isRequired,
  onCloseSideBar: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  width: PropTypes.string.isRequired,
};

const mapDispatchToProps = {
  logout: userActions.logout,
};

export default connect(
  (state) => ({ user: state.user }),
  mapDispatchToProps,
)(withWidth()(SideBar));
