import React from 'react';
import PropTypes from 'prop-types';

import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  uiProgess: {
    position: 'fixed',
    zIndex: '1000',
    height: '31px',
    width: '31px',
    left: '50%',
    top: '35%',
  },
  title: {
    marginBottom: 26,
  },
  addQuizFab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
}));

const QuizDashboard = ({
  quiz,
}) => {
  const classes = useStyles();

  return (
    <Typography variant="h4" component="h4" className={classes.title}>{quiz.title}</Typography>
  );
};

QuizDashboard.propTypes = {
  quiz: PropTypes.object.isRequired,
};

export default QuizDashboard;
