import actionTypes from 'actions/actionTypes';

/* reducer to hold home page state */
const defaultState = {
  shows: [],
};

export default function (state = defaultState, action) {
  switch (action.type) {
    case actionTypes.HOME.DATA_SUCCESS:
      return { ...state, ...action.data };
    default:
      return state;
  }
}
