import {virtualPath} from "../../commons/constant";
import {AdminServiceBase} from "./admin-service-base";
import {UserModel} from "../../models/UserModel";
import {LoginRequestModel} from "../../models/LoginRequestModel";
import {LoginResponseModel} from "../../models/LoginResponseModel";

class UserService extends AdminServiceBase {
  async Login(request: LoginRequestModel): Promise<LoginResponseModel> {
    let url = `${virtualPath}/account/login`;
    return await super.executeFetchPost(url, request);
  }
}

const UserServiceInstance = new UserService();
export {UserServiceInstance};