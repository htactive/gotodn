import {virtualPath} from "../../commons/constant";
import {AdminServiceBase} from "./admin-service-base";
import {HTServiceModel} from "../../models/HTServiceModel";
import {HTServiceLanguageModel} from "../../models/HTServiceLanguageModel";

class HTService extends AdminServiceBase {
  async GetAll(): Promise<HTServiceModel[]> {
    let url = `${virtualPath}/service/get-all`;
    return await super.executeFetch(url);
  }

  async CreateHTService(): Promise<HTServiceModel> {
    let url = `${virtualPath}/service/create-service`;
    return await super.executeFetchPost(url, null);
  }

  async UpdateHTService(model: HTServiceModel): Promise<boolean> {
    let url = `${virtualPath}/service/update-service`;
    return await super.executeFetchPost(url, model);
  }

  async DeleteHTService(Id: number): Promise<boolean> {
    let url = `${virtualPath}/service/delete-service`;
    return await super.executeFetchPost(url, Id);
  }

  async AddLanguage(model: HTServiceLanguageModel): Promise<HTServiceLanguageModel> {
    let url = `${virtualPath}/service/add-language`;
    return await super.executeFetchPost(url, model);
  }

  async DeleteLanguage(Id: number): Promise<boolean> {
    let url = `${virtualPath}/service/delete-language`;
    return await super.executeFetchPost(url, Id);
  }

  async TranslateService(serviceModel: HTServiceModel): Promise<HTServiceLanguageModel> {
    let url = `${virtualPath}/service/translate-service-language`;
    return await super.executeFetchPost(url, serviceModel);
  }

  async TranslateAllService(model: HTServiceModel): Promise<HTServiceModel> {
    let url = `${virtualPath}/service/translate-all-service-language`;
    return await super.executeFetchPost(url, model);
  }
}

const HTServiceInstance = new HTService();
export {HTServiceInstance};