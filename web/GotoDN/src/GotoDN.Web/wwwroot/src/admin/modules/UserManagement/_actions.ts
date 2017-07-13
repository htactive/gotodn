import {UserModel} from "../../../models/UserModel";
import {__action} from "./_models";
import {GetGridRequestModel, GetGridResponseModel, GridColumnFilterRequest} from "../../../commons/react-table";

export const FILTER = 'FILTER';
export const VIEW_DETAIL = 'VIEW_DETAIL';

export function action_Filter(request: GetGridRequestModel, response: GetGridResponseModel): __action {
  return {
    type: FILTER,
    GetGridResponse: response,
    GetGridRequest: request,
  }
}

export function action_ViewDetail(model: UserModel): __action {
  return {
    type: VIEW_DETAIL,
    Detail: model
  }
}