import * as React from 'react';

interface thisState {
  currentThread: number
}

export class UIBlocker extends React.Component<{}, thisState> {
  static instance;

  componentWillMount() {
    UIBlocker.instance = this;
    this.setState({currentThread: 0});
    let $div = $('<div id="ui-blocked" class="ui-blocked hidden">' +
      '<div class="loading-icon"><div class="cssload-loader">' +
      '<div class="cssload-inner cssload-one"></div>' +
      '<div class="cssload-inner cssload-two"></div>' +
      '<div class="cssload-inner cssload-three"></div></div></div>' +
      '</div>');
    $('body').append($div);
  }

  block() {
    this.setState({
      currentThread: this.state.currentThread + 1
    });
  };

  unblock() {
    this.setState({
      currentThread: this.state.currentThread ? this.state.currentThread - 1 : 0
    });
  };

  render() {
    if (this.state.currentThread) {
      $('#ui-blocked').removeClass('hidden');
    }
    else {
      $('#ui-blocked').addClass('hidden');
    }
    return null;
  }
}