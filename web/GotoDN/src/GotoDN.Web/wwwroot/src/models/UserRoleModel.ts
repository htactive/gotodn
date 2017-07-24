import {RoleModel} from "./RoleModel";
import {UserModel} from "./UserModel";
export interface UserRoleModel {
  Id: number,
  RoleId?: number,
  UserId?: number,
  User?: UserModel,
  Role?: RoleModel
}