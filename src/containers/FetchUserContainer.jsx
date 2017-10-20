import { asyncConnect } from 'redux-connect';

export default Component => asyncConnect([
  {
    promise: ({ helpers: { apiClient }, store }) => {
      // only call getUser() if they're logged in
      const { user: { loggedIn } } = store.getState();

      if (!loggedIn) {
        return Promise.resolve({});
      }

      return apiClient.getUser();
    },
  },
], null, null)(Component);
