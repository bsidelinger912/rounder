import actionTypes from './actionTypes';

export function login() {
  return {
    type: actionTypes.AUTH.LOGIN,
  };
}

export function logout() {
  return {
    type: actionTypes.AUTH.LOGOUT,
  };
}
