import {UserModel} from "../../../models/UserModel";
import {GetGridRequestModel, GetGridResponseModel} from "../../../commons/react-table";
export interface __state {
  Detail?: UserModel,
  GetGridRequest?: GetGridRequestModel,
  GetGridResponse?: GetGridResponseModel
}

export interface __action extends __state {
  type: string,
}
