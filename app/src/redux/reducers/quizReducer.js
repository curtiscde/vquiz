import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function quizReducer(state = initialState.quiz, action) {
  switch (action.type) {
    case types.CREATE_QUIZ_PENDING:
      return {
        ...state,
        fetching: true,
      };
    case types.FETCH_QUIZ_PENDING:
      return {
        ...state,
        [action.quizId]: {
          fetching: true,
        },
      };
    case types.FETCH_QUIZ_SUCCESS:
      return {
        ...state,
        [action.quiz.id]: {
          fetching: false,
          data: action.quiz,
        },
      };
    case types.DELETE_QUIZ_PENDING:
      return {
        ...state,
        [action.quizId]: {
          ...state[action.quizId],
          deleting: true,
        },
      };
    case types.DELETE_QUIZ_SUCCESS:
      return {
        ...state,
        [action.quizId]: {
          deleting: false,
          deleted: true,
        },
      };
    case types.DELETE_QUIZ_FAILURE:
      return {
        ...state,
        [action.quizId]: {
          deleting: false,
          deleted: false,
          deleteErrors: action.errors,
        },
      };
    case types.EDIT_QUIZ_PENDING:
      return {
        ...state,
        [action.quizId]: {
          ...state[action.quizId],
          editing: true,
        },
      };
    case types.EDIT_QUIZ_SUCCESS:
      return {
        ...state,
        [action.quizId]: {
          ...state[action.quizId],
          editing: false,
          edited: true,
        },
      };
    case types.EDIT_QUIZ_FAILURE:
      return {
        ...state,
        [action.quizId]: {
          editing: false,
          edited: false,
          editErrors: action.errors,
        },
      };
    default:
      return state;
  }
}
