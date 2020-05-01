import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';

import * as quizActions from '../redux/actions/quizActions';

import QuizForm from '../components/QuizForm';

const QuizCreate = ({
  createQuiz,
  history,
}) => {
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState({
    title: null,
    date: null,
  });

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
    createQuiz(fields)
      .then(() => {
        setLoading(false);
        history.push('/');
      });
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Create Quiz
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

QuizCreate.propTypes = {
  createQuiz: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
};

const mapDispatchToProps = {
  createQuiz: quizActions.createQuiz,
};

export default connect(
  () => ({}),
  mapDispatchToProps,
)(QuizCreate);
