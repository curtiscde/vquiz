import * as types from './actionTypes';

function hideSnackbar() {
  return (dispatch) => dispatch({
    type: types.UI_SNACKBAR_CLOSE,
  });
}

// eslint-disable-next-line import/prefer-default-export
export function showSnackbar(message) {
  return (dispatch) => {
    dispatch({
      type: types.UI_SNACKBAR_OPEN,
      message,
    });
    setTimeout(() => {
      dispatch(hideSnackbar());
    }, 3000);
  };
}
