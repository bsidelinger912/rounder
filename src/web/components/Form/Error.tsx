/**
 * @class Error
 * @description holds server side errors
 */

import * as React from "react";

const styles = require('./styles.scss');

export interface Props {
}

const Error: React.SFC<Props> = ({ children }) => {
  return (
    <div className={styles.formError}>{children}</div>
  );
};

export default Error;