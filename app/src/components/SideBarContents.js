import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItemText from '@material-ui/core/ListItemText';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

const SideBarContents = ({
  user,
  handleLogout,
  history,
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
        <ListItem button key="ViewQuizzes" onClick={() => history.push('/')}>
          <ListItemIcon>
            {' '}
            <FormatListBulletedIcon />{' '}
          </ListItemIcon>
          <ListItemText primary="Your Quizzes" />
        </ListItem>
        <ListItem button key="CreateQuiz" onClick={() => history.push('/newquiz')}>
          <ListItemIcon>
            {' '}
            <AddCircleOutlineIcon />{' '}
          </ListItemIcon>
          <ListItemText primary="Create New Quiz" />
        </ListItem>
        <ListItem button key="Logout" onClick={handleLogout}>
          <ListItemIcon>
            {' '}
            <ExitToAppIcon />{' '}
          </ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List >
    </>
  );
};

SideBarContents.propTypes = {
  user: PropTypes.object.isRequired,
  handleLogout: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(SideBarContents);
