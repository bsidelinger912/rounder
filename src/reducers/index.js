import { reducer as reduxAsyncConnect } from 'redux-connect';

import global from './globalReducer';
import home from './homeReducer';

export default {
  global,
  home,
  reduxAsyncConnect,
};
