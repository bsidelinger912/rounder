/**
 * @class NewProfileButton
 * @description 
 */

import * as React from "react";
import PlusButton from "src/web/components/PlusButton";

export interface Props {
}

const NewProfileButton: React.SFC<Props> = () => {
  return (
    <PlusButton href="/new-profile" tooltipContents="Add a new Profile" />
  );
};

export default NewProfileButton;