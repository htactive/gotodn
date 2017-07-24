
import {LoginResponseEnums} from "../commons/constant";
export interface LoginResponseModel {
  IsSuccess: boolean  ;
  ErrorMessage: LoginResponseEnums  ;
  AccessToken: string  ;
}