import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Router, browserHistory, Route, IndexRoute} from 'react-router';
import {AdminRoutePath, RoleTypeEnums} from './commons/constant';
import {Index} from './admin/index'
import Login from "./admin/views/Pages/Login/Login";
import {UserServiceInstance} from "./admin/services/UserService";
import UserManagement from "./admin/modules/UserManagement/UserManagement";
import store from "./admin/modules/CurrentUser/_store";
import {action_SetCurrentUser} from "./admin/modules/CurrentUser/_actions";
import CategoryManagement from "./admin/modules/Category/CategoryManagement";
import HTServiceManagement from "./admin/modules/Service/ServiceManagement";
import PlaceManagement from "./admin/modules/Place/PlaceManagement";
import CityManagement from "./admin/modules/City/CityManagement";
import DistrictManagement from "./admin/modules/District/DistrictManagement";
async function requireAuth(nextState, replace, next) {
  let currentUser = await UserServiceInstance.getMyProfile(() => {
  });
  if (!currentUser || !currentUser.UserRoles ||
    !currentUser.UserRoles.some(x => x.Role && (x.Role.RoleType == RoleTypeEnums.Admin
    || x.Role.RoleType == RoleTypeEnums.SuperAdmin))) {
    replace(AdminRoutePath.Login);
  }
  store.dispatch(action_SetCurrentUser(currentUser));
  next();
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path={AdminRoutePath.Index} component={Index}
           onEnter={(nextState, replace, next) => requireAuth(nextState, replace, next)}
    >
      <IndexRoute component={UserManagement}/>
      <Route path={`${AdminRoutePath.UserManagement}(/:id)`} component={UserManagement}/>
      <Route path={`${AdminRoutePath.CategoryManagement}(/:id)`} component={CategoryManagement}/>
      <Route path={`${AdminRoutePath.ServiceManagement}(/:id)`} component={HTServiceManagement}/>
      <Route path={`${AdminRoutePath.PlaceManagement}`} component={PlaceManagement}>
        <Route path={`${AdminRoutePath.PlaceManagement}(/:id)`} component={PlaceManagement}/>
      </Route>
      <Route path={`${AdminRoutePath.CityManagement}(/:id)`} component={CityManagement}/>
      <Route path={`${AdminRoutePath.DistrictManagement}(/:id)`} component={DistrictManagement}/>

    </Route>
    <Route path={AdminRoutePath.Login} component={Login}/>
  </Router>,
  document.getElementById('root')
);