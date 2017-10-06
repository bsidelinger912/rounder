import actionTypes from './actionTypes';

export function loading(requestKey) {
  return {
    type: actionTypes.API_CLIENT.LOADING,
    requestKey,
  };
}

export function loaded(requestKey, data) {
  return {
    type: actionTypes.API_CLIENT.LOADED,
    data,
    requestKey,
  };
}

export function error(requestKey, err) {
  return {
    type: actionTypes.API_CLIENT.ERROR,
    err,
    requestKey,
  };
}
