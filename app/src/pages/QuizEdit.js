import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

import * as quizActions from '../redux/actions/quizActions';

import QuizForm from '../components/QuizForm';

const QuizEdit = ({
  quiz,
  loadQuiz,
  editQuiz,
  history,
  ...props
}) => {
  const { quizId } = props.match.params;

  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState({
    title: '',
    date: '',
  });

  useEffect(() => {
    if (!quiz) {
      loadQuiz(quizId);
    } else {
      setFields({
        ...quiz,
      });
    }
  }, [quiz]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFields((prevFields) => ({
      ...prevFields,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true);
    editQuiz(fields)
      .then(() => {
        setLoading(false);
        history.push(`/quiz/${quiz.id}`);
      });
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Edit Quiz
      </Typography>
      <QuizForm
        fields={fields}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </>
  );
};

QuizEdit.propTypes = {
  quiz: PropTypes.object,
  loadQuiz: PropTypes.func.isRequired,
  editQuiz: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      quizId: PropTypes.string.isRequired,
    }),
  }),
};

function mapStateToProps(state, ownProps) {
  const { quizId } = ownProps.match.params;
  const quiz = quizId && state.quiz[quizId] && state.quiz[quizId].data
    ? state.quiz[quizId].data
    : null;
  return {
    quiz,
  };
}

const mapDispatchToProps = {
  loadQuiz: quizActions.loadQuiz,
  editQuiz: quizActions.editQuiz,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(QuizEdit);
