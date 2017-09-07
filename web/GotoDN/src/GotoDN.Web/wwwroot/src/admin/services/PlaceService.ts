import {virtualPath} from "../../commons/constant";
import {AdminServiceBase} from "./admin-service-base";
import {PlaceModel} from "../../models/PlaceModel";
import {PlaceLanguageModel} from "../../models/PlaceLanguageModel";
import {GetGridRequestModel, GetGridResponseModel} from "../../commons/react-table";
import {ImportPlaceGroupModel} from "../../models/ImportPlaceModel";

class PlaceService extends AdminServiceBase {
  async GetAll(): Promise<PlaceModel[]> {
    let url = `${virtualPath}/place/get-all`;
    return await super.executeFetch(url);
  }

  async CreatePlace(): Promise<PlaceModel> {
    let url = `${virtualPath}/place/create-Place`;
    return await super.executeFetchPost(url, null);
  }

  async UpdatePlace(model: PlaceModel): Promise<boolean> {
    let url = `${virtualPath}/place/update-Place`;
    return await super.executeFetchPost(url, model);
  }

  async DeletePlace(Id: number): Promise<boolean> {
    let url = `${virtualPath}/place/delete-Place`;
    return await super.executeFetchPost(url, Id);
  }

  async DeletePlaces(Ids: number[]): Promise<boolean> {
    let url = `${virtualPath}/place/delete-places`;
    return await super.executeFetchPost(url, Ids);
  }

  async AddLanguage(model: PlaceLanguageModel): Promise<PlaceLanguageModel> {
    let url = `${virtualPath}/place/add-language`;
    return await super.executeFetchPost(url, model);
  }

  async AddAllLanguage(Id: number): Promise<PlaceModel> {
    let url = `${virtualPath}/place/add-all-language`;
    return await super.executeFetchPost(url, Id);
  }

  async DeleteLanguage(Id: number): Promise<boolean> {
    let url = `${virtualPath}/place/delete-language`;
    return await super.executeFetchPost(url, Id);
  }

  async Filter(request: GetGridRequestModel): Promise<GetGridResponseModel> {
    let url = `${virtualPath}/place/filter`;
    return await super.executeFetchPost(url, request);
  }

  async GetPlace(id: number): Promise<PlaceModel> {
    let url = `${virtualPath}/place/get-place-by-id?id=` + id;
    return await super.executeFetch(url);
  }

  async SaveImportedPlace(request: ImportPlaceGroupModel[]): Promise<boolean> {
    let url = `${virtualPath}/place/save-imported-place`;
    return await super.executeFetchPost(url, request);
  }

  async TranslatePlaceLanguage(request: PlaceModel): Promise<PlaceLanguageModel> {
    let url = `${virtualPath}/place/translate-place-language`;
    return await super.executeFetchPost(url, request);
  }

  async TranslateAllPlaceLanguage(request: PlaceModel): Promise<PlaceModel> {
    let url = `${virtualPath}/place/translate-all-place-language`;
    return await super.executeFetchPost(url, request);
  }
}

const PlaceServiceInstance = new PlaceService();
export {PlaceServiceInstance};