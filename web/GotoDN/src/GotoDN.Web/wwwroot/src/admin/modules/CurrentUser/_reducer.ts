import * as actions from "./_actions";
import {__action, __state} from "./_models";

const reducer = (state: __state = {}, action: __action) => {
  switch (action.type) {
    case actions.SET_CURRENT_USER:
      state.CurrentUser = action.CurrentUser;
      break;
  }
  return state;
};

export default reducer;