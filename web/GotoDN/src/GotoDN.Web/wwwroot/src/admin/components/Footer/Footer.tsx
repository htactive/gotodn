import * as React from 'react';

class Footer extends React.Component<{},{}> {
  render() {
    return (
      <div id="footer" className="clearfix sidebar-page right-sidebar-page">
        <p className="pull-left">
          Copyrights &copy; 2017 <a href="/" className="color-blue strong" target="_blank">DFW New Homes</a>. All rights reserved.
        </p>
        <p className="pull-right">
          <a href="/privacy" target="_blank" className="mr5">Terms of use</a>
          |
          <a href="/privacy" target="_blank" className="ml5 mr25">Privacy police</a>
        </p>
      </div>
    );
  }
}

export default Footer;
