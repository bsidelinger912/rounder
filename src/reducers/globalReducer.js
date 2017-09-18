/* reducer to hold global state for things such as menu and auth */
import actionTypes from 'actions/actionTypes';

const defaultState = {
  loggedIn: false,
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case actionTypes.AUTH.LOGIN:
      return { ...state, loggedIn: true };

    case actionTypes.AUTH.LOGOUT:
      return { ...state, loggedIn: false };

    default:
      return state;
  }
}
