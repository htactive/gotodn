import {UserModel} from "./UserModel";
import {ImageModel} from "./ImageModel";
export interface UserProfileModel {
  Id: number,
  UserId?: number,
  Email?: string,
  WasVerifiedEmail?: boolean,
  AvatarId?: number,
  FirstName?: string,
  LastName?: string,
  Address?: string,
  City?: string,
  User?: UserModel,
  Image?: ImageModel
}