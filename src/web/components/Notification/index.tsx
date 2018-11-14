/**
 * @class Notification
 * @description 
 */

import * as React from "react";
import * as ReactDOM from 'react-dom';

const styles = require('./notification.scss');

export enum ActionType {
  Informational,
  Destrictive,
}

export interface Props {
  actionType: ActionType;
  text: String;
}

interface State {
}

class Notification extends React.Component<Props, State> {
  private el: HTMLDivElement;
  private modalRoot: HTMLElement;

  constructor(props: Props) {
    super(props);
    this.el = document.createElement('div');
    this.modalRoot = document.getElementById('modal-root') as HTMLElement;
  }

  componentDidMount() {
    this.modalRoot && this.modalRoot.appendChild(this.el);
  }

  componentWillUnmount() {
    this.modalRoot && this.modalRoot.removeChild(this.el);
  }

  public render():JSX.Element {
    const { actionType, text } = this.props;

    const className  = actionType === ActionType.Destrictive
      ? styles.destructive
      : styles.informational;

    return ReactDOM.createPortal(
      (
        <div className={`${styles.main} ${className}`}>
          {text}
        </div>
      ),
      this.modalRoot
    );
  }
}

export default Notification;
