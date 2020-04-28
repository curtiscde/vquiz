import React from 'react';
import PropTypes from 'prop-types';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';

const SideBarContents = ({
  user,
  handleLogout,
}) => {
  if (user.fetchingProfile) {
    return (
      <center>
        <CircularProgress size={80} />
      </center>
    );
  }

  return (
    <>
      <center>
        <p>{user.profile.username}</p>
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
    </>
  );
};

SideBarContents.propTypes = {
  user: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
};

export default SideBarContents;
