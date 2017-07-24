import {RoleTypeEnums} from "../commons/constant";
export interface RoleModel {
  Id: number
  Name?: string,
  DisplayName?: string,
  RoleType?: RoleTypeEnums
}