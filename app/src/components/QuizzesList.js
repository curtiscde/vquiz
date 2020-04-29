import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';

import dayjs from 'dayjs';
import dayJsAdvancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(dayJsAdvancedFormat);

const useStyles = makeStyles(() => ({
  quizCard: {
    cursor: 'pointer',
  },
}));

const QuizzesList = ({ quizzes, history }) => {
  const classes = useStyles();

  return (
    <Grid container spacing={3}>
      {
        quizzes.map((quiz) => (
          <Grid key={quiz.quizId} item xs={12} sm={6}>
            <Card className={classes.quizCard} onClick={() => history.push(`/quiz/${quiz.quizId}`)}>
              <CardContent>
                <Typography variant="h5" component="h2">{quiz.title}</Typography>
                <Typography color="textSecondary">
                  {dayjs(quiz.date).format('Do MMMM YYYY')}
                </Typography>
              </CardContent>
              <CardActions>
                <Button size="small" color="primary">
                  View
                </Button>
              </CardActions>
            </Card>
          </Grid>
        ))
      }
    </Grid>
  );
};

QuizzesList.propTypes = {
  quizzes: PropTypes.array.isRequired,
  history: PropTypes.object.isRequired,
};

export default withRouter(QuizzesList);
