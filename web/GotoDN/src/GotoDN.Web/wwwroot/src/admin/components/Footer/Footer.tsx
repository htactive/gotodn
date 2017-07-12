import * as React from 'react';

class Footer extends React.Component<{},{}> {
  render() {
    return (
      <footer className="app-footer">
        <a href="http://coreui.io">CoreUI</a> &copy; 2017 creativeLabs.
        <span className="float-right">Powered by <a href="http://coreui.io">CoreUI</a></span>
      </footer>
    );
  }
}

export default Footer;
