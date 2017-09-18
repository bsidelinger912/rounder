/**
 * @class ContextProvider
 * @description provides global context such as instance of ApiClient
 */

import { Component, Children } from 'react';
import PropTypes from 'prop-types';

export default class ContextProvider extends Component {
  static propTypes = {
    apiClient: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    children: PropTypes.element.isRequired,
  }

  static childContextTypes = {
    apiClient: PropTypes.object,
  }

  getChildContext() {
    const { apiClient } = this.props;

    return {
      apiClient,
    };
  }

  render() {
    return Children.only(this.props.children);
  }
}
