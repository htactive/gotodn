import * as React from 'react';
import UserList from "../../components/UserManagement/UserList";
import UserDetail from "../../components/UserManagement/UserDetail";
import store from "./_store";
import {action_ViewDetail} from "./_actions";
import {UserServiceInstance} from "../../services/UserService";

class UserManagement extends React.Component<{}, {}> {

  async componentWillReceiveProps(props) {

  }
  render() {
    return (
      <div className="page-content-wrapper">
        <UserList/>
        <UserDetail/>
      </div>);
  }
}

export default UserManagement;