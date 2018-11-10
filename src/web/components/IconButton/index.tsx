/**
 * @class IconButton
 * @description 
 */

import * as React from "react";

const styles = require('./iconButton.scss');

export enum IconType {
  Edit = "icon-edit",
  Add = "icon-plus",
}

export interface Props {
  iconType: IconType;
}

const IconButton: React.SFC<Props> = ({ iconType }) => {
  return (
    <span className={styles.main}><i className={iconType} /></span>
  );
};

export default IconButton;