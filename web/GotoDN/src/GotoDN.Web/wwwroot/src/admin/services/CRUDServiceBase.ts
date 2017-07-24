import {virtualPath} from "../../commons/constant";
import {GetGridRequestModel, GetGridResponseModel} from "../../commons/react-table";
import {AdminServiceBase} from "./admin-service-base";
import {ObjectSavedResponseModel} from '../../models/ObjectSavedResponseModel';

export abstract class CRUDServiceBase<TModel> extends AdminServiceBase {
  abstract get controller(): string;

  async Filter(request: GetGridRequestModel): Promise<GetGridResponseModel> {
    let url = `${virtualPath}/${this.controller}/filter`;
    return await super.executeFetchPost(url, request);
  }

  async Get(id: number): Promise<TModel> {
    let url = `${virtualPath}/${this.controller}/get?id=${id}`;
    return await super.executeFetch(url);
  }

  async UpdateOrCreate(model: TModel): Promise<ObjectSavedResponseModel<TModel>> {
    let url = `${virtualPath}/${this.controller}/update-or-create`;
    return await super.executeFetchPost(url, model);
  }

  async Delete(id: number): Promise<boolean> {

    let url = `${virtualPath}/${this.controller}/delete`;
    return await super.executeFetchPost(url, id);
  }
}