import {UserStatusEnums} from "../commons/constant";
import {UserRoleModel} from "./UserRoleModel";
import {UserProfileModel} from "./UserProfileModel";
export interface UserModel {
  Id: number,
  UserName?: string,
  IsAnonymous?: boolean,
  UserStatusId?: UserStatusEnums,
  ProviderKey?: string,
  ProviderName?: string,
  UserProfiles?: UserProfileModel[],
  UserRoles?: UserRoleModel[],
  CreateDate?: Date,
  Password?: string
}
