/**
 * @class SafeTooltip
 * @description creates a tooltip safe for SSR
 */

import * as React from "react";
import Tooltip, { TooltipProps } from 'react-tooltip-lite';

const SafeTooltip: React.SFC<TooltipProps> = (props) => {
  if (typeof window !== "undefined") {
    return <Tooltip {...props} />
  }

  return <span>{props.children}</span>;
};

export default SafeTooltip;
