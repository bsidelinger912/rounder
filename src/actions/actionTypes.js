const actionTypes = {
  USER: {
    DATA: {
      SUCCESS: 'USER.DATA.SUCCESS',
      LOADING: 'USER.DATA.LOADING',
      ERROR: 'USER.DATA.ERROR',
    },
  },

  AUTH: {
    LOGIN: 'AUTH.LOGIN',
    LOGOUT: 'AUTH.LOGOUT',
  },
};

export default Object.freeze(actionTypes);
