import * as React from 'react';

class Footer extends React.Component<{},{}> {
  render() {
    return (
      <div id="footer" className="clearfix sidebar-page right-sidebar-page">
        <p className="pull-left">
          Copyrights &copy; 2017 <a href="/" className="color-blue strong" target="_blank">GotoDN</a>. All rights reserved.
        </p>
      </div>
    );
  }
}

export default Footer;
