import {virtualPath} from "../../commons/constant";
import {AdminServiceBase} from "./admin-service-base";
import {DistrictModel} from "../../models/CityModel";
import {GetGridRequestModel, GetGridResponseModel} from "../../commons/react-table";

class DistrictService extends AdminServiceBase {
  async CreateDistrict(): Promise<DistrictModel> {
    let url = `${virtualPath}/city/create-district`;
    return await super.executeFetchPost(url, null);
  }

  async UpdateDistrict(model: DistrictModel): Promise<boolean> {
    let url = `${virtualPath}/city/update-district`;
    return await super.executeFetchPost(url, model);
  }

  async DeleteDistrict(Id: number): Promise<boolean> {
    let url = `${virtualPath}/city/delete-district`;
    return await super.executeFetchPost(url, Id);
  }

  async Filter(request: GetGridRequestModel): Promise<GetGridResponseModel> {
    let url = `${virtualPath}/city/filter-district`;
    return await super.executeFetchPost(url, request);
  }
}

const DistrictServiceInstance = new DistrictService();
export {DistrictServiceInstance};