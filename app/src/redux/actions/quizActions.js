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


export function loadQuizzes() {
  return (dispatch) => {
    dispatch(loadQuizzesPending());
    return quizApi
      .getQuizzes()
      .then((quizzes) => dispatch(loadQuizzesSuccess(quizzes)))
      .catch((errors) => dispatch(loadQuizzesFailure(errors)));
  };
}

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
