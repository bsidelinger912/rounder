// user methods
import actionTypes from 'actions/actionTypes';

export const getUser = apiClient => () => apiClient.fetchWithAuth(actionTypes.USER.DATA, '/user');

export const updateUser = apiClient => userData => apiClient.fetchWithAuth(actionTypes.USER.DATA, '/user', {
  method: 'POST',
  body: JSON.stringify(userData),
  headers: {
    'Content-Type': 'application/json',
  },
});
