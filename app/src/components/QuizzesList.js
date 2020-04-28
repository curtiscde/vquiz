import React from 'react';
import PropTypes from 'prop-types';

import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

const QuizzesList = ({ quizzes }) => (
  quizzes.map((quiz) => (
    <Card key={quiz.quizId}>
      <CardContent>
        {quiz.title}
      </CardContent>
    </Card>
  ))
);

QuizzesList.propTypes = {
  quizzes: PropTypes.array.isRequired,
};

export default QuizzesList;
