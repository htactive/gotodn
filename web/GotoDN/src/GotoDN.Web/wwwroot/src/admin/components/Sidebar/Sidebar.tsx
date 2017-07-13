import * as React from 'react';
import { Link } from 'react-router'
import {AdminRoutePath} from "../../../commons/constant";
import {UserModel} from "../../../models/UserModel";
import {LeftSideBarMenuItemModel} from "../../../models/LeftSideBarMenuItemModel";
import {UserServiceInstance} from "../../services/UserService";

const menus: LeftSideBarMenuItemModel[] = [
  {
    Icon: 'fa fa-user',
    Text: 'User management',
    LinkTo: AdminRoutePath.Dashboard
  }
];
interface thisState{
  MenuItems?: LeftSideBarMenuItemModel[],
  CurrentUser?: UserModel,
  GGPlusAvatarLink?: string
}

class Sidebar extends React.Component<any,thisState> {

  componentWillMount(){
    this.setState({
      MenuItems: menus
    });
  }

  async getGGPlusAvatar(user: UserModel) {
    if (!user) return;

    let ggPlusAvatar = '';
    if (user && user.ProviderName === "Google") {
      if (user.UserProfiles[0] == null
        || user.UserProfiles[0].Image == null
        || user.UserProfiles[0].Image.Url == null
        || user.UserProfiles[0].Image.Url == '') {
        ggPlusAvatar = await
          UserServiceInstance.getGGPlusAvatar(user.ProviderKey);
      }
    }
    this.setState({
      GGPlusAvatarLink: ggPlusAvatar
    });
  }


  private renderAvatar() {
    if (!this.state.CurrentUser) return <i className="fa fa-spinner fa-pulse fa-3x fa-fw margin-bottom"/>;
    if (this.state.CurrentUser.UserProfiles[0] == null
      || this.state.CurrentUser.UserProfiles[0].Image == null
      || this.state.CurrentUser.UserProfiles[0].Image.Url == null
      || this.state.CurrentUser.UserProfiles[0].Image.Url == '') {

      if (this.state.CurrentUser.ProviderName === "Facebook") {
        return <img src={`http://graph.facebook.com/${this.state.CurrentUser.ProviderKey}/picture`}
                    className="userImg"
                    alt={this.state.CurrentUser.UserProfiles[0].Email}/>;
      }
      if (this.state.CurrentUser.ProviderName === "Google") {
        if (this.state.GGPlusAvatarLink) {
          return <img src={this.state.GGPlusAvatarLink}
                      className="userImg"
                      alt={this.state.CurrentUser.UserProfiles[0].Email}/>;
        }
        else {
          return <i className="fa fa-spinner fa-pulse fa-3x fa-fw margin-bottom"/>;
        }
      }

      return <img src="/images/user.png"
                  className="header-image-avatar img-responsive"
                  width="30" height="30"
      />;
    }
  }

  render() {
    return (
      <aside id="sidebar" className="page-sidebar hidden-md hidden-sm hidden-xs">
        <div className="sidebar-inner">
          <div className="sidebar-scrollarea">
            <div className="sidebar-panel">
              <h5 className="sidebar-panel-title">Profile</h5>
            </div>
            <div className="user-info clearfix">
              {this.renderAvatar()}
              <a className="name">{(this.state.CurrentUser &&
              this.state.CurrentUser.UserProfiles &&
              this.state.CurrentUser.UserProfiles[0]) ? this.state.CurrentUser.UserProfiles[0].Email : ''}</a>
            </div>
            <div className="sidebar-panel">
              <h5 className="sidebar-panel-title">Navigator</h5>
            </div>
            <div className="side-nav">
              <ul className="nav">
                {this.state.MenuItems && this.state.MenuItems.length > 0 ?
                  this.state.MenuItems.map(x => this.renderMenuItem(x))
                  : null}
              </ul>
            </div>
          </div>
        </div>
      </aside>
    );
  }

  private renderMenuItem(menuItem: LeftSideBarMenuItemModel) {
    return (
      <li>
        <Link to={menuItem.LinkTo} activeClassName="active">
          {menuItem.Icon ?
            <i className={`icon ${menuItem.Icon}`}/> : null}
          <span className="txt">{menuItem.Text}</span>
        </Link>
        {menuItem.SubMenuItems && menuItem.SubMenuItems.length > 0 ?
          <ul className="sub">
            {menuItem.SubMenuItems.map(x => this.renderMenuItem(x))}
          </ul> : null}
      </li>);
  }
}

export default Sidebar;
