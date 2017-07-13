import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Router, browserHistory, Route, IndexRoute} from 'react-router';
import {AdminRoutePath, RoleTypeEnums} from './commons/constant';
import {Index} from './admin/index'
import Login from "./admin/views/Pages/Login/Login";
import {UserServiceInstance} from "./admin/services/UserService";
import UserManagement from "./admin/modules/UserManagement/UserManagement";
async function requireAuth(nextState, replace, next) {
  let currentUser = await UserServiceInstance.getMyProfile(()=>{});
  if (!currentUser || !currentUser.UserRoles ||
    !currentUser.UserRoles.some(x => x.Role && (x.Role.RoleType == RoleTypeEnums.Admin
    || x.Role.RoleType == RoleTypeEnums.SuperAdmin))) {
    replace(AdminRoutePath.Login);
  }
  next();
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path={AdminRoutePath.Index} component={Index}
           onEnter={(nextState, replace, next) => requireAuth(nextState, replace, next)}
    >
      <Route path={AdminRoutePath.UserManagement} component={UserManagement}/>

    </Route>
    <Route path={AdminRoutePath.Login} component={Login}/>
  </Router>,
  document.getElementById('root')
);