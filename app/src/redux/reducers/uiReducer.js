import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function uiReducer(state = initialState.ui, action) {
  switch (action.type) {
    case types.UI_SNACKBAR_OPEN:
      return {
        ...state,
        snackbar: {
          open: true,
          message: action.message,
        },
      };
    case types.UI_SNACKBAR_CLOSE:
      return {
        ...state,
        snackbar: {
          ...initialState.ui.snackbar,
        },
      };
    default:
      return state;
  }
}
