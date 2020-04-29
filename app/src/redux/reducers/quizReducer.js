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
    default:
      return state;
  }
}
