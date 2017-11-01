import React from 'react';
import { AppRegistry, StyleSheet, Text, View, Component, NativeModules, findNodeHandle, Alert } from 'react-native';

const UIManager = NativeModules.UIManager;

export class AutoText extends React.Component {

  state = {
    size: 13,
    limitLine: false,
  };

  componentWillMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(nextProps) {

    if(nextProps.children) {
      this.setState({
        size: nextProps.style.fontSize
      });
      this.tryNewSize();
    }

  }

  tryNewSize() {
    if(this._text) {
      this.setState({complete: false, limitLine: false});
      requestAnimationFrame(() => {
        UIManager.measureLayoutRelativeToParent(
          findNodeHandle(this._text || 0),
          () => {
          },
          (x, y, w, h) => {
            this.isSizeOk(w, h)
          },
        );
      });
    }
  }

  isSizeOk(w, h) {
    if (h > this.props.height) {
      if (this.state.size == 13) {
        this.setState({complete: true,limitLine: true});
      } else {
        this.setState({size: this.state.size -= 1});
        this.tryNewSize();
      }
    } else {
      this.setState({complete: true});
    }
  }

  _onLayout() {
  }

  componentDidMount() {
    this.tryNewSize();
  }

  render() {
    return (
    this.state.limitLine ?
      <Text ref={component => this._text = component}
            onLayout={this._onLayout}
            style={[this.props.style, {fontSize: this.state.size, textAlign: 'left'}]}
            numberOfLines={this.props.numberOfLines}
      >
        {this.props.children}
      </Text> :
      <Text ref={component => this._text = component}
            onLayout={this._onLayout}
            style={[this.props.style, {fontSize: this.state.size, textAlign: 'left'}]}
      >
        {this.props.children}
      </Text>
    )
  }

}