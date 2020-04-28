import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function quizReducer(state = initialState.quizzes, action) {
  switch (action.type) {
    case types.FETCH_QUIZZES_PENDING:
      return {
        ...state,
        fetching: true,
      };
    default:
      return state;
  }
}
