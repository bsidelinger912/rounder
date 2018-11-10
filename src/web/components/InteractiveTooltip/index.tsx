/**
 * @class InteractiveTooltip
 * @description 
 */

import * as React from "react";

import Tooltip from 'src/web/components/Tooltip';
import { stopProp } from "src/web/utils";

const styles = require('./interactiveTooltip.scss');

export interface Props {
  headingContent: React.ReactNode;
  mainContent: React.ReactNode;
  direction?: string;
}

interface State {
  tooltipOpen: boolean;
}

class InteractiveTooltip extends React.Component<Props, State> {
  private tipContentRef = React.createRef<HTMLDivElement>();

  constructor(props: Props) {
    super(props);

    this.state = { tooltipOpen: false };
  }

  public componentDidMount(): void {
    document.body.addEventListener('click', this.hideTip);
    
    // we can't work with react's synthetic event system as the stopProp would be to late due to it's asyncronsity
    this.tipContentRef.current && this.tipContentRef.current.addEventListener('click', stopProp);
  }

  public componentWillUnmount(): void {
    document.body.removeEventListener('click', this.hideTip);
    this.tipContentRef.current && this.tipContentRef.current.removeEventListener('click', stopProp);
  }

  private hideTip: () => void = () => {
    this.setState({ tooltipOpen: false });
  }

  private toggleTip: () => void = () => {
    this.setState({ tooltipOpen: !this.state.tooltipOpen });
  }

  public render(): JSX.Element {
    const { headingContent, mainContent, children, direction } = this.props;
    const { tooltipOpen } = this.state;

    const tipContent = (
      <div className={styles.main} ref={this.tipContentRef}>
        <div className={styles.heading}>
          {headingContent}
          <button className={styles.close} onClick={this.hideTip}>&times;</button>
        </div>
        <div className={styles.main}>
          {mainContent}
        </div>
      </div>
    );

    return (
      <Tooltip 
        arrow={false} 
        className={styles.tooltip} 
        isOpen={tooltipOpen} 
        content={tipContent} 
        direction={direction}
      >
        <span onClick={this.toggleTip}>{children}</span>
      </Tooltip>
    );
  }
}

export default InteractiveTooltip;