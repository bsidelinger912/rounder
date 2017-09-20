/* eslint-disable no-param-reassign */

import { getUser, updateUser } from './user';

export default (apiClient) => {
  apiClient.getUser = getUser(apiClient);
  apiClient.updateUser = updateUser(apiClient);
};
