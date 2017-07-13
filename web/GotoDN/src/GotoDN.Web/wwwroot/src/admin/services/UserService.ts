import {virtualPath} from "../../commons/constant";
import {AdminServiceBase} from "./admin-service-base";
import {UserModel} from "../../models/UserModel";
import {LoginRequestModel} from "../../models/LoginRequestModel";
import {LoginResponseModel} from "../../models/LoginResponseModel";
import {GetGridRequestModel, GetGridResponseModel} from "../../commons/react-table";

class UserService extends AdminServiceBase {
  async Filter(request:GetGridRequestModel):Promise<GetGridResponseModel>{
    let url = `${virtualPath}/user/filter`;
    return await super.executeFetchPost(url, request);
  }

  async Login(request: LoginRequestModel): Promise<LoginResponseModel> {
    let url = `${virtualPath}/account/login`;
    return await super.executeFetchPost(url, request);
  }

  async LogOut(): Promise<boolean> {
    let url = `${virtualPath}/account/log-out`;
    return await super.executeFetchPost(url, null);
  }

  public async getGGPlusAvatar(ggKey: string): Promise<string> {
    let apiKey = 'AIzaSyAMtzHXiRa8wCDukvRvhNup7Ww0X7nSTEQ';
    let url = `https://www.googleapis.com/plus/v1/people/${ggKey}?fields=image&key=${apiKey}`;
    let result = await fetch(url);
    if (result.ok) {
      let obj = await result.json();
      let link = obj["image"]["url"];
      if (link) {
        return link.replace('https://', 'http://');
      }
    }
    return '';
  }

  public async getMyProfile(_401Callback?: () => void): Promise<UserModel> {
    let url = `${virtualPath}/account/get-my-profile`;
    return await super.executeFetch(url, false, _401Callback);
  }

}

const UserServiceInstance = new UserService();
export {UserServiceInstance};