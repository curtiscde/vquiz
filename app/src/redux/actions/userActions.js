import * as types from './actionTypes';
import * as userApi from '../../api/userApi';

function loginSuccess(token) {
  return {
    type: types.LOGIN_SUCCESS,
    token,
  };
}

function loginFailure(errors) {
  return {
    type: types.LOGIN_FAILURE,
    errors,
  };
}

// eslint-disable-next-line import/prefer-default-export
export function login(fields) {
  return (dispatch) => (
    userApi
      .login(fields)
      .then(({ token }) => dispatch(loginSuccess(token)))
      .catch((errors) => dispatch(loginFailure(errors)))
  );
}
