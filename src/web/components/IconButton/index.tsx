/**
 * @class IconButton
 * @description 
 */

import * as React from 'react';

const styles = require('./iconButton.scss');

export enum IconType {
  Edit = 'icon-edit',
  Add = 'icon-plus',
  Trash = 'icon-trash',
}

export interface Props {
  iconType: IconType;
  onClick?: () => void;
  loading?: boolean;
}

const IconButton: React.SFC<Props> = ({ iconType, onClick }) => {
  return (
    <button className={styles.main} onClick={onClick}><i className={iconType} /></button>
  );
};

export default IconButton;