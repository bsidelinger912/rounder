/**
 * @class ContextProvider
 * @description provides global context such as instance of AuthClient
 */

import { Component, Children } from 'react';
import PropTypes from 'prop-types';

export default class ContextProvider extends Component {
  static propTypes = {
    authClient: PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
    children: PropTypes.element.isRequired,
  }

  static childContextTypes = {
    authClient: PropTypes.object,
  }

  getChildContext() {
    const { authClient } = this.props;

    return {
      authClient,
    };
  }

  render() {
    return Children.only(this.props.children);
  }
}
