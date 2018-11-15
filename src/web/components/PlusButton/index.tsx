/**
 * @class PlusButton
 * @description 
 */

import * as React from "react";
import { Link } from 'react-router-dom';

import Tooltip from "src/web/components/Tooltip";

const styles = require('./plusButton.scss');

export interface Props {
  tooltipContents?: React.ReactNode;
  href?: string;
}

const PlusButton: React.SFC<Props> = ({ tooltipContents, href }) => {
  const elem = href ? (
    <Link to={href} className={styles.main} >&#43;</Link>
  ) : (
    <button className={styles.main}>&#43;</button>
  );

  if (tooltipContents) {
    return (
      <Tooltip content={tooltipContents}>
        {elem}
      </Tooltip>
    );
  }
  return elem;
};

export default PlusButton;