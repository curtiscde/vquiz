import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function userReducer(state = initialState.user, action) {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      return {
        ...state,
        token: action.token,
        isAuthenticated: true,
      };
    case types.LOGIN_FAILURE:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
      };
    case types.LOGOUT_SUCCESS:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        profile: {},
      };
    case types.LOAD_USER_SUCCESS:
      return {
        ...state,
        profile: action.profile,
      };
    default:
      return state;
  }
}
