import * as types from './actionTypes';
import * as quizApi from '../../api/quizApi';

const loadQuizzesPending = () => ({
  type: types.FETCH_QUIZZES_PENDING,
});

const loadQuizzesSuccess = (quizzes) => ({
  type: types.FETCH_QUIZZES_SUCCESS,
  quizzes,
});

const loadQuizzesFailure = (errors) => ({
  type: types.FETCH_QUIZZES_FAILURE,
  errors,
});

// eslint-disable-next-line import/prefer-default-export
export function loadQuizzes() {
  return (dispatch) => {
    dispatch(loadQuizzesPending());
    return quizApi
      .getQuizzes()
      .then((quizzes) => dispatch(loadQuizzesSuccess(quizzes)))
      .catch((errors) => dispatch(loadQuizzesFailure(errors)));
  };
}
