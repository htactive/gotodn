import {UserModel} from "../../../models/UserModel";
import {__action} from "./_models";
export const SET_CURRENT_USER = 'SET_CURRENT_USER';

export function action_SetCurrentUser(model: UserModel): __action {
  return {
    type: SET_CURRENT_USER,
    CurrentUser:model
  }
}
