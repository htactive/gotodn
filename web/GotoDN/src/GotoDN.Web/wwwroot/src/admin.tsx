import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Router, browserHistory, Route, IndexRoute} from 'react-router';
import {AdminRoutePath, RoleTypeEnums} from './commons/constant';
import {Index} from './admin/index'
async function requireAuth(nextState, replace, next) {
  next();
}

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path={AdminRoutePath.Index} component={Index}
           onEnter={(nextState, replace, next) => requireAuth(nextState, replace, next)}
    >
    </Route>
  </Router>,
  document.getElementById('root')
);