import React from 'react';
import PropTypes from 'prop-types';

import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const QuizzesList = ({ quizzes }) => (
  <Grid container spacing={3}>
    {
      quizzes.map((quiz) => (
        <Grid key={quiz.quizId} item xs={12} sm={6}>
          <Card>
            <CardContent>
              <Typography variant="h5" component="h2">{quiz.title}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))
    }
  </Grid>
);

QuizzesList.propTypes = {
  quizzes: PropTypes.array.isRequired,
};

export default QuizzesList;
