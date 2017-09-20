// user methods

export const getUser = () => () => Promise.resolve({ name: 'Benny' });

export const updateUser = apiClient => userData => apiClient.fetchWithAuth('/user', {
  method: 'POST',
  body: JSON.stringify(userData),
  headers: {
    'Content-Type': 'application/json',
  },
});
