import {virtualPath} from "../../commons/constant";
import {AdminServiceBase} from "./admin-service-base";
import {CityModel, DistrictModel} from "../../models/CityModel";
import {GetGridRequestModel, GetGridResponseModel} from "../../commons/react-table";

class CityService extends AdminServiceBase {
  async GetAllCity(): Promise<CityModel[]> {
    let url = `${virtualPath}/city/get-all-city`;
    return await super.executeFetch(url);
  }

  async GetAllDistrict(): Promise<DistrictModel[]> {
    let url = `${virtualPath}/city/get-all-district`;
    return await super.executeFetch(url);
  }

  async CreateCity(): Promise<CityModel> {
    let url = `${virtualPath}/city/create-City`;
    return await super.executeFetchPost(url, null);
  }

  async UpdateCity(model: CityModel): Promise<boolean> {
    let url = `${virtualPath}/city/update-City`;
    return await super.executeFetchPost(url, model);
  }

  async DeleteCity(Id: number): Promise<boolean> {
    let url = `${virtualPath}/city/delete-City`;
    return await super.executeFetchPost(url, Id);
  }

  async AddDistrict(model: DistrictModel): Promise<DistrictModel> {
    let url = `${virtualPath}/city/add-district`;
    return await super.executeFetchPost(url, model);
  }

  async DeleteDistrict(Id: number): Promise<boolean> {
    let url = `${virtualPath}/city/delete-district`;
    return await super.executeFetchPost(url, Id);
  }

  async Filter(request: GetGridRequestModel): Promise<GetGridResponseModel> {
    let url = `${virtualPath}/city/filter`;
    return await super.executeFetchPost(url, request);
  }
}

const CityServiceInstance = new CityService();
export {CityServiceInstance};