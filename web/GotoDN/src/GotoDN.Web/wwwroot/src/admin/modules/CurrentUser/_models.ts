import {UserModel} from "../../../models/UserModel";
export interface __state {
  CurrentUser?: UserModel
}

export interface __action extends __state {
  type: string,
}
