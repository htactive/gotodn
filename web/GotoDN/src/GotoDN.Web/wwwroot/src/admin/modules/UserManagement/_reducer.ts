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
  }
  return state;
};

export default reducer;