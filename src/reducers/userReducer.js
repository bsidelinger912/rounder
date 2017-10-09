import actionTypes from 'actions/actionTypes';

const defaultState = {
  loggedIn: false,
  profile: {},
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case actionTypes.AUTH.LOGIN:
      return { ...state, loggedIn: true };

    case actionTypes.AUTH.LOGOUT:
      return { ...state, loggedIn: false, profile: {} };

    case actionTypes.USER.DATA.SUCCESS:
      return { ...state, profile: action.data.user };

    default:
      return state;
  }
}
