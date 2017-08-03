import {createStore} from "redux";


export const AppStoreActions = {
  SaveLanguage: "SaveLanguage",
  SaveCity: "SaveCity",
  SaveFavorite: "SaveFavorite",
};


function appReducer( thisState, action) {
  let newState = {};
  Object.assign(newState, thisState);

  switch (action.type) {
    case AppStoreActions.SaveLanguage:
      let data = action["data"];
      newState = {
        type: AppStoreActions.SaveLanguage,
        language: data ,
        city: thisState.city,
      };
      break;
    case AppStoreActions.SaveCity:
      data = action["data"];
      newState = {
        type: AppStoreActions.SaveLanguage,
        language: thisState.language ,
        city: data ,
      };
      break;
    case "@@redux/INIT":
      newState = {};
      break;
  }

  return newState;
}

export function appSaveLanguage(data) {

  return {
    type: AppStoreActions.SaveLanguage,
    data: data,
  }
}

export function appSaveCity(data) {

  return {
    type: AppStoreActions.SaveCity,
    data: data,
  }
}

export const appStore = createStore(appReducer);