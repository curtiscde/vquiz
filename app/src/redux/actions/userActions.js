import * as types from './actionTypes';
import * as userApi from '../../api/userApi';

const loginSuccess = (token) => ({
  type: types.LOGIN_SUCCESS,
  token,
});

const loginFailure = (errors) => ({
  type: types.LOGIN_FAILURE,
  errors,
});

const logoutSuccess = () => ({
  type: types.LOGOUT_SUCCESS,
});

const loadUserSuccess = (profile) => ({
  type: types.LOAD_USER_SUCCESS,
  profile,
});

const loadUserFailure = (profile) => ({
  type: types.LOAD_USER_FAILURE,
  profile,
});

export function login(fields) {
  return (dispatch) => (
    userApi
      .login(fields)
      .then(({ token }) => {
        localStorage.setItem('accessToken', token);
        dispatch(loginSuccess(token));
      })
      .catch((errors) => dispatch(loginFailure(errors)))
  );
}

export function logout() {
  return (dispatch) => {
    localStorage.removeItem('accessToken');
    dispatch(logoutSuccess());
  };
}

export function checkAuthentication() {
  return (dispatch) => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      dispatch(loginSuccess(accessToken));
    }
  };
}

export function loadUser(accessToken) {
  return (dispatch) => (
    userApi
      .getUser(accessToken)
      .then((profile) => dispatch(loadUserSuccess(profile)))
      .catch((errors) => dispatch(loadUserFailure(errors)))
  );
}
