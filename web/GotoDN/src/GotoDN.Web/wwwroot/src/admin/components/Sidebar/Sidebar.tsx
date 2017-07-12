import * as React from 'react';
import { Link } from 'react-router'

class Sidebar extends React.Component<any,any> {

  render() {
    return (
      <div className="sidebar">
        <nav className="sidebar-nav">
          <ul className="nav">
            <li className="nav-item">
              <Link to={'/dashboard'} className="nav-link" activeClassName="active">
                <i className="icon-speedometer"></i> Dashboard <span className="badge badge-info">NEW</span>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default Sidebar;
