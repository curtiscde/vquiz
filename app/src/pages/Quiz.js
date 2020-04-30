import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as quizActions from '../redux/actions/quizActions';

import QuizDashboard from '../components/QuizDashboard';
import QuizSpeedDial from '../components/QuizSpeedDial';

const Quiz = ({
  loadQuiz,
  deleteQuiz,
  quizState,
  history,
  ...props
}) => {
  const { quizId } = props.match.params;

  useEffect(() => {
    loadQuiz(quizId);
  }, [quizId]);

  if (!quizState[quizId] || quizState[quizId].fetching) {
    return <>Loading</>;
  }
  if (quizState[quizId].deleted) {
    return <>Deleted</>;
  }

  const quiz = quizState[quizId].data;

  const handleDeleteQuiz = () => {
    deleteQuiz(quiz.id)
      .then(() => {
        history.push('/');
      });
  };

  const handleEditQuiz = () => {
    history.push(`/edit/${quizId}`);
  };

  return (
    <>
      <QuizDashboard quiz={quiz} />
      <QuizSpeedDial
        quizTitle={quiz.title}
        onDeleteClick={handleDeleteQuiz}
        onEditClick={handleEditQuiz}
      />
    </>
  );
};

Quiz.propTypes = {
  loadQuiz: PropTypes.func.isRequired,
  deleteQuiz: PropTypes.func.isRequired,
  quizState: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
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
  deleteQuiz: quizActions.deleteQuiz,
};

export default connect(
  mapDispatchToState,
  mapDispatchToProps,
)(Quiz);
