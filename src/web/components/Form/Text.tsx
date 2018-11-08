/**
 * @class Text
 * @description
 */

import * as React from 'react';
import * as PropTypes from 'prop-types';

// import styles from './className.scss';

export class Text extends React.Component<any, any> {
  static propTypes = {
    value: PropTypes.string,
  }

  static defaultProps = {
    value: '',
  }

  static contextTypes = {
    field: PropTypes.string,
  }

  render() {
    const { value } = this.props;
    const { field } = this.context;

    return (
      <input type="text" defaultValue={value} name={field} id={field} />
    );
  }
}

export default Text;
