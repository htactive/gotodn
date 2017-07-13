import * as React from 'react';
import UserList from "../../components/UserManagement/UserList";
import UserDetail from "../../components/UserManagement/UserDetail";

class UserManagement extends React.Component<{}, {}> {
  render() {
    return (
      <div className="page-content-wrapper">
        <UserList/>
        <UserDetail/>
      </div>);
  }
}

export default UserManagement;