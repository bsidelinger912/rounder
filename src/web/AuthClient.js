import cookie from 'isomorphic-cookie';

import { login, logout } from 'actions/authActions';

require('isomorphic-fetch');

// TODO: configure for env
const baseUrl = 'http://localhost:4000';

export function makeRequestKey(url, options) {
  return JSON.stringify({ url, options });
}

class AuthClient {
  constructor(reduxStore, request) {
    // request is only defined on the server
    this.authToken = cookie.load('jwt', request);
    this.reduxStore = reduxStore;

    // since we need to create the store before we creat the auth client,
    // we'll dispatch a login here on start if they've got a jwt cookie
    if (this.authToken) {
      this.reduxStore.dispatch(login());
    }

    // not sure why this is needed, but it seems to be
    this.logout = this.logout.bind(this);
  }

  saveToken(token) {
    cookie.save('jwt', token, { secure: false }); // TODO: make conditional
    this.authToken = token;
    this.reduxStore.dispatch(login());
  }

  login(data) {
    return fetch(`${baseUrl}/login`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(resp => resp.json())
    .then((json) => {
      this.saveToken(json.token);
    });
  }

  logout() {
    cookie.remove('jwt');
    this.authToken = undefined;
    this.reduxStore.dispatch(logout());
  }

  signup(data) {
    fetch(`${baseUrl}/signup`, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(resp => resp.json())
    .then(json => this.saveToken(json.token));
  }
}

export default AuthClient;
