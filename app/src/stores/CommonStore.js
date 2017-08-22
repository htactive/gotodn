import {createStore} from "redux";


export const CommonStoreActions = {
  ToggleSearchBar: "ToggleSearchBar",
  CloseSearchBar: "CloseSearchBar",
  ScrollTopDetail: "ScrollTopDetail",
  UpdateCategoryName: "UpdateCategoryName",
  ReloadFavorite: "ReloadFavorite",
};


function commonReducer( thisState, action) {
  let newState = {};
  Object.assign(newState, thisState);

  switch (action.type) {
    case CommonStoreActions.ToggleSearchBar:
      let data = action["data"];
      newState = {
        type: CommonStoreActions.ToggleSearchBar,
        showSearchBar: data,
      };
      break;
    case CommonStoreActions.CloseSearchBar:
      newState = {
        type: CommonStoreActions.CloseSearchBar,
      };
      break;
    case CommonStoreActions.ScrollTopDetail:
      newState = {
        type: CommonStoreActions.ScrollTopDetail,
      };
      break;
    case CommonStoreActions.UpdateCategoryName:
      let cates = action["data"];
      newState = {
        type: CommonStoreActions.UpdateCategoryName,
        categories: cates,
      };
      break;
    case CommonStoreActions.ReloadFavorite:
      newState = {
        type: CommonStoreActions.ReloadFavorite,
      };
      break;
    case "@@redux/INIT":
      newState = {type: null, showSearchBar: false,};
      break;
  }

  return newState;
}

export function toggleSearchBar(data) {
  return {
    type: CommonStoreActions.ToggleSearchBar,
    data: data,
  }
}

export function closeSearchBar() {
  return {
    type: CommonStoreActions.CloseSearchBar,
  }
}

export function scrollTopDetail() {
  return {
    type: CommonStoreActions.ScrollTopDetail,
  }
}

export function updateCategoryName(data) {
  return {
    type: CommonStoreActions.UpdateCategoryName,
    data: data,
  }
}

export function reloadFavorite() {
  return {
    type: CommonStoreActions.ReloadFavorite,
  }
}

export const commonStore = createStore(commonReducer);