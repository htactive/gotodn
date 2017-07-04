import {createStore} from "redux";


export const NavigationStoreActions = {
  Navigate: "Navigate",
  Back: "Back",
};


function navigationReducer( thisState, action) {
  let newState = {};
  Object.assign(newState, thisState);

  switch (action.type) {
    case NavigationStoreActions.Navigate:
      const routeName = action["routeName"];
      const params = action["params"];
      newState = {
        type: NavigationStoreActions.Navigate,
        routeName: routeName ,
        params: params || {},
      };
      break;
    case NavigationStoreActions.Back:
      newState = {
        type: NavigationStoreActions.Back,
      };
      break;
    case "@@redux/INIT":
      newState = {};
      break;
  }

  return newState;
}

export function navigateToRouteAction(routeName, params) {

  return {
    type: NavigationStoreActions.Navigate,
    routeName: routeName,
    params: params
  }
}

export function navigateGoBackAction() {

  return {
    type: NavigationStoreActions.Back
  }
}

export const navigationStore = createStore(navigationReducer);