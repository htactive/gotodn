import * as actions from "./_actions";
import {__action, __state} from "./_models";

const reducer = (state: __state = {}, action: __action) => {

  switch (action.type) {
    case actions.FILTER:
      state.GetGridRequest = action.GetGridRequest;
      state.GetGridResponse = action.GetGridResponse;
      break;
    case actions.VIEW_DETAIL:
      state.Detail = action.Detail;
      break;
    case actions.CHANGE_USER_STATUS:
      for (let i = 0; i < state.GetGridResponse.DataSource.length; i++) {
        if (state.GetGridResponse.DataSource[i].Id == action.Detail.Id) {
          state.GetGridResponse.DataSource[i].UserStatusId = action.Detail.UserStatusId;
          break;
        }
      }
      break;
  }
  return state;
};

export default reducer;