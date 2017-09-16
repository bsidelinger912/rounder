
// TODO: configure for env
const baseUrl = 'localhost:4000';

// TODO: accept the req here to grab cookies
export default () => ({
  // TODO: get from cookie
  authToken: undefined,

  login: data => (
    fetch(`${baseUrl}/login`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(resp => resp.json())
    // TODO: save to cookie
  ),

  signup: data => (
    fetch(`${baseUrl}/signup`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(resp => resp.json())
    // TODO: save to cookie
  ),
});
