import * as types from './actionTypes';
import * as quizApi from '../../api/quizApi';
import { loadQuizzes } from './quizzesActions';
import { showSnackbar } from './uiActions';

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

const deleteQuizPending = (quizId) => ({
  type: types.DELETE_QUIZ_PENDING,
  quizId,
});

const deleteQuizSuccess = (quizId) => ({
  type: types.DELETE_QUIZ_SUCCESS,
  quizId,
});

const deleteQuizFailure = (quizId, errors) => ({
  type: types.DELETE_QUIZ_FAILURE,
  quizId,
  errors,
});

const editQuizPending = (quizId) => ({
  type: types.EDIT_QUIZ_PENDING,
  quizId,
});

const editQuizSuccess = (quizId) => ({
  type: types.EDIT_QUIZ_SUCCESS,
  quizId,
});

const editQuizFailure = (quizId, errors) => ({
  type: types.EDIT_QUIZ_FAILURE,
  quizId,
  errors,
});

// eslint-disable-next-line import/prefer-default-export
export function createQuiz(quiz) {
  return (dispatch) => (
    quizApi
      .createQuiz(quiz)
      .then((data) => {
        dispatch(showSnackbar('Quiz Created!'));
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

export function deleteQuiz(quizId) {
  return (dispatch) => {
    dispatch(deleteQuizPending(quizId));
    return quizApi
      .deleteQuiz(quizId)
      .then(() => dispatch(deleteQuizSuccess(quizId)))
      .catch((errors) => dispatch(deleteQuizFailure(quizId, errors)));
  };
}

export function editQuiz(quiz) {
  return (dispatch) => {
    dispatch(editQuizPending(quiz.id));
    return quizApi
      .editQuiz(quiz)
      .then((q) => dispatch(editQuizSuccess(q)))
      .catch((errors) => dispatch(editQuizFailure(quiz.id, errors)));
  };
}
