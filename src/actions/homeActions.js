import actionTypes from './actionTypes';
import { loading, error, loaded } from './sharedActions';

export function homeDataSuccess(data) {
  return {
    type: actionTypes.HOME.DATA_SUCCESS,
    data,
  };
}

export function getHomeData() {
  return (dispatch) => {
    dispatch(loading());
    return fetch('http://localhost:3000/stubData/shows.json').then(resp => resp.json())
      .then((resp) => {
        dispatch(loaded());
        dispatch(homeDataSuccess({ shows: resp }));
      }).catch(error);
  };
}
