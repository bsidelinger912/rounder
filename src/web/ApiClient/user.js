// user methods

export const getUser = apiClient => () => apiClient.fetchWithAuth('/secret');

export const updateUser = apiClient => userData => apiClient.fetchWithAuth('/user', {
  method: 'POST',
  body: JSON.stringify(userData),
  headers: {
    'Content-Type': 'application/json',
  },
});
