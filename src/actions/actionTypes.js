const actionTypes = {
  LOADING: 'LOADING',
  ERROR: 'ERROR',
  LOADED: 'LOADED',

  HOME: {
    DATA_SUCCESS: 'HOME.DATA_SUCCESS',
  },

  AUTH: {
    LOGIN: 'AUTH.LOGIN',
    LOGOUT: 'AUTH.LOGOUT',
  },
};

export default Object.freeze(actionTypes);
