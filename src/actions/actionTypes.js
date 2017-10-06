const actionTypes = {
  // depricated
  HOME: {
    DATA_SUCCESS: 'HOME.DATA_SUCCESS',
  },


  API_CLIENT: {
    LOADING: 'API_CLIENT.LOADING',
    ERROR: 'API_CLIENT.ERROR',
    LOADED: 'API_CLIENT.LOADED',
  },

  AUTH: {
    LOGIN: 'AUTH.LOGIN',
    LOGOUT: 'AUTH.LOGOUT',
  },
};

export default Object.freeze(actionTypes);
