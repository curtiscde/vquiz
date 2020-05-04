import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';

import * as quizzesActions from '../redux/actions/quizzesActions';

import QuizzesList from '../components/QuizzesList';

const useStyles = makeStyles((theme) => ({
  uiProgess: {
    position: 'fixed',
    zIndex: '1000',
    height: '31px',
    width: '31px',
    left: '50%',
    top: '35%',
    marginLeft: '-75px',
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

const Home = ({
  quizzesFetching,
  quizzes,
  loadQuizzes,
  history,
}) => {
  const classes = useStyles();

  useEffect(() => {
    loadQuizzes();
  }, []);

  const handleAddQuiz = () => {
    history.push('/newquiz');
  };

  if (quizzesFetching) {
    return (
      <div className={classes.root}>
        <CircularProgress size={150} className={classes.uiProgess} />
      </div>
    );
  }

  return (
    <>
      <Typography variant="h4" component="h4" className={classes.title}>Your Quizzes</Typography>
      <QuizzesList quizzes={quizzes} />
      <Fab className={classes.addQuizFab} label="Create Quiz" color="primary" onClick={handleAddQuiz}>
        <AddIcon />
      </Fab>
    </>
  );
};

Home.propTypes = {
  quizzesFetching: PropTypes.bool.isRequired,
  quizzes: PropTypes.array.isRequired,
  loadQuizzes: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  quizzesFetching: state.quizzes.fetching,
  quizzes: state.quizzes.data,
});

const mapDispatchToProps = {
  loadQuizzes: quizzesActions.loadQuizzes,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
