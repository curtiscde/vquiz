import * as types from './actionTypes';
import * as userApi from '../../api/userApi';

const loadUserPending = () => ({
  type: types.LOAD_USER_PENDING,
});

const loadUserSuccess = (profile) => ({
  type: types.LOAD_USER_SUCCESS,
  profile,
});

const loadUserFailure = (profile) => ({
  type: types.LOAD_USER_FAILURE,
  profile,
});

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

export function loadUser(accessToken) {
  return (dispatch) => {
    dispatch(loadUserPending());
    return userApi
      .getUser(accessToken)
      .then((profile) => dispatch(loadUserSuccess(profile)))
      .catch((errors) => dispatch(loadUserFailure(errors)));
  };
}

export function login(fields) {
  return (dispatch) => (
    userApi
      .login(fields)
      .then(({ token }) => {
        localStorage.setItem('accessToken', token);
        localStorage.setItem('authExpiry', new Date().getTime() + (60 * 60 * 1000));
        dispatch(loginSuccess(token));
        dispatch(loadUser(token));
      })
      .catch((errors) => dispatch(loginFailure(errors)))
  );
}

export function logout() {
  return (dispatch) => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('authExpiry');
    dispatch(logoutSuccess());
  };
}

export function checkAuthentication() {
  return (dispatch) => {
    const accessToken = localStorage.getItem('accessToken');
    const authExpiry = localStorage.getItem('authExpiry');
    console.log('authExpiry', authExpiry);
    if (accessToken && parseInt(authExpiry, 10) > (new Date().getTime())) {
      dispatch(loginSuccess(accessToken));
      dispatch(loadUser(accessToken));
    }
  };
}
