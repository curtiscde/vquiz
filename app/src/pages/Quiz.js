import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as quizActions from '../redux/actions/quizActions';

import QuizDashboard from '../components/QuizDashboard';

const Quiz = ({
  loadQuiz,
  quizState,
  ...props
}) => {
  const { quizId } = props.match.params;

  useEffect(() => {
    loadQuiz(quizId);
  }, [quizId]);

  if (!quizState[quizId] || quizState[quizId].fetching) {
    return <>Loading</>;
  }

  const quiz = quizState[quizId].data;

  return <QuizDashboard quiz={quiz} />;
};

Quiz.propTypes = {
  loadQuiz: PropTypes.func.isRequired,
  quizState: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      quizId: PropTypes.string.isRequired,
    }),
  }),
};

const mapDispatchToState = (state) => ({
  quizState: state.quiz,
});

const mapDispatchToProps = {
  loadQuiz: quizActions.loadQuiz,
};

export default connect(
  mapDispatchToState,
  mapDispatchToProps,
)(Quiz);
