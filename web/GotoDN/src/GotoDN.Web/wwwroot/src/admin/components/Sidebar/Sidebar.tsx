import * as React from 'react';
import {Link} from 'react-router'
import {AdminRoutePath, RoleTypeEnums} from "../../../commons/constant";
import {UserModel} from "../../../models/UserModel";
import {LeftSideBarMenuItemModel} from "../../../models/LeftSideBarMenuItemModel";
import {UserServiceInstance} from "../../services/UserService";
import store from "../../modules/CurrentUser/_store";

const menus: LeftSideBarMenuItemModel[] = [
  {
    Icon: 'fa fa-user',
    Text: 'Quản lý người dùng',
    LinkTo: AdminRoutePath.UserManagement
  },
  {
    Icon: 'fa fa-list-ul',
    Text: 'Quản lý danh mục',
    LinkTo: AdminRoutePath.CategoryManagement
  },
  {
    Icon: 'fa fa-bars',
    Text: 'Quản lý dịch vụ',
    LinkTo: AdminRoutePath.ServiceManagement
  },
  {
    Icon: 'fa fa-list-alt',
    Text: 'Địa điểm - Sự kiện',
    LinkTo: AdminRoutePath.PlaceManagement
  },
  {
    Icon: 'fa fa-globe',
    Text: 'Quản lý khu vực',
    SubMenuItems: [{
      Icon: 'fa fa-globe',
      Text: 'Tỉnh thành',
      LinkTo: AdminRoutePath.CityManagement,
    }, {
      Icon: 'fa fa-globe',
      Text: 'Quận huyện',
      LinkTo: AdminRoutePath.DistrictManagement,
    }],
  }
];
interface thisState {
  MenuItems?: LeftSideBarMenuItemModel[],
  CurrentUser?: UserModel,
  GGPlusAvatarLink?: string
}

class Sidebar extends React.Component<any, thisState> {

  componentWillMount() {
    this.setState({
      MenuItems: menus
    });

    store.subscribe(() => {
      let state = store.getState();
      this.setState({
        CurrentUser: state.CurrentUser
      });
      if (!state.CurrentUser.UserRoles.some(x => x.Role && x.Role.RoleType == RoleTypeEnums.SuperAdmin)) {
        this.setState({
          MenuItems: menus.filter(x => x.LinkTo !== AdminRoutePath.UserManagement && x.Code !== "Configuration")
        });
      }
      this.getGGPlusAvatar(state.CurrentUser);
    });
  }

  componentDidMount() {
    let state = store.getState();
    this.setState({
      CurrentUser: state.CurrentUser
    });
    if (!state.CurrentUser.UserRoles.some(x => x.Role && x.Role.RoleType == RoleTypeEnums.SuperAdmin)) {
      this.setState({
        MenuItems: menus.filter(x => x.LinkTo !== AdminRoutePath.UserManagement && x.Code !== "Configuration")
      });
    }
    this.getGGPlusAvatar(state.CurrentUser);
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
              <h5 className="sidebar-panel-title">Thông tin người dùng</h5>
            </div>
            <div className="user-info clearfix">
              {this.renderAvatar()}
              <a className="name">{this.state.CurrentUser ?
                this.state.CurrentUser.UserName : ''}</a>
            </div>
            <div className="sidebar-panel">
              <h5 className="sidebar-panel-title">Điều hướng</h5>
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
      <li key={menuItem.Text}>
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
