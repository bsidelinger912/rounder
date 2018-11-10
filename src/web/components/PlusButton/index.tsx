/**
 * @class PlusButton
 * @description 
 */

import * as React from "react";

import Tooltip from "src/web/components/Tooltip";

const styles = require('./plusButton.scss');

export interface Props {
  tooltipContents?: React.ReactNode;
}

const PlusButton: React.SFC<Props> = ({ tooltipContents }) => {
  if (tooltipContents) {
    return (
      <Tooltip content={tooltipContents}>
        <button className={styles.main}>&#43;</button>
      </Tooltip>
    );
  }
  return (
    <button className={styles.main}>&#43;</button>
  );
};

export default PlusButton;