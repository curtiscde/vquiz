import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';

import * as quizActions from '../redux/actions/quizActions';

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

const Home = ({ quizzes, loadQuizzes }) => {
  const classes = useStyles();

  useEffect(() => {
    loadQuizzes();
  }, []);

  if (quizzes.fetching) {
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
  quizzes: PropTypes.object.isRequired,
  loadQuizzes: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  quizzes: state.quizzes,
});

const mapDispatchToProps = {
  loadQuizzes: quizActions.loadQuizzes,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Home);
