import * as types from './actionTypes';
import * as quizApi from '../../api/quizApi';
import { loadQuizzes } from './quizzesActions';

const loadQuizPending = (quizId) => ({
  type: types.FETCH_QUIZ_PENDING,
  quizId,
});

const loadQuizSuccess = (quiz) => ({
  type: types.FETCH_QUIZ_SUCCESS,
  quiz,
});

const loadQuizFailure = (errors) => ({
  type: types.FETCH_QUIZ_FAILURE,
  errors,
});

// eslint-disable-next-line import/prefer-default-export
export function createQuiz(quiz) {
  return (dispatch) => (
    quizApi
      .createQuiz(quiz)
      .then((data) => {
        dispatch(loadQuizzes());
        return data.quizId;
      })
  );
}

export function loadQuiz(quizId) {
  return (dispatch) => {
    dispatch(loadQuizPending(quizId));
    return quizApi
      .getQuiz(quizId)
      .then((quiz) => dispatch(loadQuizSuccess(quiz)))
      .catch((errors) => dispatch(loadQuizFailure(errors)));
  };
}
