import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import SpeedDial from '@material-ui/lab/SpeedDial';
import ListIcon from '@material-ui/icons/List';
import SpeedDialAction from '@material-ui/lab/SpeedDialAction';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  wrapper: {
    position: 'fixed',
    height: 380,
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  speedDial: {
    position: 'absolute',
    '&.MuiSpeedDial-directionUp, &.MuiSpeedDial-directionLeft': {
      bottom: theme.spacing(2),
      right: theme.spacing(2),
    },
    '&.MuiSpeedDial-directionDown, &.MuiSpeedDial-directionRight': {
      top: theme.spacing(2),
      left: theme.spacing(2),
    },
  },
}));

const DeleteDialog = ({
  open,
  onDialogClose,
  onDeleteClick,
  quizTitle,
}) => (
    <Dialog
      open={open}
      onClose={onDialogClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Delete Quiz?'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Are you sure you wish to delete <strong>{quizTitle}</strong>?
      </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onDialogClose} color="primary">
          Cancel
          </Button>
        <Button onClick={onDeleteClick} color="primary" autoFocus>
          Delete Quiz
          </Button>
      </DialogActions>
    </Dialog>);

DeleteDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onDialogClose: PropTypes.func.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  quizTitle: PropTypes.string.isRequired,
};

const QuizSpeedDial = ({
  quizTitle,
  onDeleteClick,
  onEditClick,
}) => {
  const classes = useStyles();

  const [speedDialOpen, setSpeedDialOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

  const actions = [
    {
      name: 'Edit Quiz',
      icon: <EditIcon />,
      onClick: onEditClick,
    },
    {
      name: 'Delete Quiz',
      icon: <DeleteIcon />,
      onClick: () => setDeleteDialogOpen(true),
    },
  ];

  return (
    <>
      <div className={classes.wrapper}>
        <SpeedDial
          ariaLabel="Actions"
          className={classes.speedDial}
          icon={<ListIcon />}
          onClose={() => setSpeedDialOpen(false)}
          onOpen={() => setSpeedDialOpen(true)}
          open={speedDialOpen}
        >
          {actions.map((action) => (
            <SpeedDialAction
              key={action.name}
              icon={action.icon}
              tooltipTitle={action.name}
              onClick={action.onClick}
            />
          ))}
        </SpeedDial>
      </div>
      <DeleteDialog
        open={deleteDialogOpen}
        onDialogClose={() => setDeleteDialogOpen(false)}
        onDeleteClick={onDeleteClick}
        quizTitle={quizTitle}
      />
    </>
  );
};

QuizSpeedDial.propTypes = {
  quizTitle: PropTypes.string.isRequired,
  onDeleteClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
};

export default QuizSpeedDial;
