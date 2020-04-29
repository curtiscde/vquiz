import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function quizzesReducer(state = initialState.quizzes, action) {
  switch (action.type) {
    case types.FETCH_QUIZZES_PENDING:
      return {
        ...state,
        fetching: true,
      };
    case types.FETCH_QUIZZES_SUCCESS:
      return {
        ...state,
        fetching: false,
        fetched: true,
        data: action.quizzes,
      };
    case types.FETCH_QUIZZES_FAILURE:
      return {
        ...state,
        fetching: false,
      };
    default:
      return state;
  }
}
