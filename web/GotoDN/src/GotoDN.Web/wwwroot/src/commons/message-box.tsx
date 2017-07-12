import * as React from 'react'
import {Modal, Button, Form, FormGroup, Col, ControlLabel, FormControl, Checkbox} from 'react-bootstrap';

export enum MessageBoxButton {
  Yes = 1,
  No = 2,
  Cancel = 4,
  OK = 8,
}

export enum MessageBoxResult {
  Yes = 1,
  No = 2,
  Cancel = 4,
  OK = 8,
  None = 0
}

export enum MessageBoxType {
  Information,
  Confirmation,
  Warning,
  Error
}

export enum MessageBoxButtons {
  YesNo = 3,
  YesNoCancel = 7,
  OK = 8,
  OKCancel = 12
}

export interface MessageBoxOptions {
  type: MessageBoxType,
  buttons: MessageBoxButtons,
  isShow: boolean,
  title: string,
  content: string,
  stringMappings?: [{ type: MessageBoxButton, text: string }]
}

export class MessageBox extends React.Component<{}, MessageBoxOptions> {

  static instance: MessageBox;
  doAction: (re: MessageBoxResult) => void;

  componentWillMount() {
    MessageBox.instance = this;
    this.setState({type: MessageBoxType.Confirmation, buttons: MessageBoxButtons.OKCancel});
  }

  show(st: MessageBoxOptions): Promise<MessageBoxResult> {
    this.setState({
      stringMappings: null
    });
    return new Promise((da) => {
      st.isShow = true;
      this.setState(st);
      this.doAction = da;
    });
  }

  action(result: MessageBoxResult) {
    this.close();
    this.doAction && this.doAction(result);
  }

  render() {
    return (
      <Modal show={this.state.isShow} onHide={() => this.action(MessageBoxResult.None)}>
        <Modal.Header closeButton>
          <Modal.Title>{this.state.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="center" dangerouslySetInnerHTML={{__html: this.state.content}}></div>
        </Modal.Body>
        <Modal.Footer>
          {((MessageBoxButton.OK & this.state.buttons) != 0) && (
            <Button
              onClick={() => this.action(MessageBoxResult.OK)}>{this.renderButtonText(MessageBoxButton.OK)}</Button>)}
          {((MessageBoxButton.Cancel & this.state.buttons) != 0) && (
            <Button
              onClick={() => this.action(MessageBoxResult.Cancel)}>{this.renderButtonText(MessageBoxButton.Cancel)}</Button>)}
          {((MessageBoxButton.Yes & this.state.buttons) != 0) && (
            <Button
              onClick={() => this.action(MessageBoxResult.Yes)}>{this.renderButtonText(MessageBoxButton.Yes)}</Button>)}
          {((MessageBoxButton.No & this.state.buttons) != 0) && (
            <Button
              onClick={() => this.action(MessageBoxResult.No)}>{this.renderButtonText(MessageBoxButton.No)}</Button>)}
        </Modal.Footer>
      </Modal>
    )
  }

  renderButtonText(bt: MessageBoxButton): string {
    if (this.state.stringMappings) {
      let t = this.state.stringMappings.filter(x => x.type == bt)[0];
      if (t)return t.text;
    }
    return this.textDefault(bt);
  }

  textDefault(bt: MessageBoxButton): string {
    switch (bt) {
      case MessageBoxButton.OK:
        return "Đồng ý";
      case MessageBoxButton.Cancel:
        return "Hủy bỏ";
      case MessageBoxButton.Yes:
        return "Có";
      case MessageBoxButton.No:
        return "Không";
    }
    return "Đồng ý";
  }

  close() {
    this.setState({isShow: false});
  }
}