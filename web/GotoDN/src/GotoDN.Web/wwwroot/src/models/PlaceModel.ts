import {PlaceLanguageModel} from "./PlaceLanguageModel";
import {CategoryModel} from "./CategoryModel";
import {HTServiceModel} from "./HTServiceModel";
import {CityModel, DistrictModel} from "./CityModel";
export interface PlaceModel {
  Id: number,
  CreatedDate?: Date,
  UpdatedDate?: Date,
  Priority?: number,
  HTServiceId?: number,
  CategoryId?: number,
  PlaceLanguages?: PlaceLanguageModel[],
  Category?: CategoryModel,
  HTService?: HTServiceModel,

  Address?: string,
  CityId?: number,
  CloseTime?: Date,
  DistrictId?: number,
  EndDate?: Date,
  IsCategorySlider?: boolean,
  IsHomeSlider?: boolean,
  Latitude?: number,
  Longitude?: number,
  OpenTime?: Date,
  Phone?: string,
  Fax?: string,
  Rating?: number,
  StartDate?: Date,
  Website?: string,
  City?: CityModel,
  District?: DistrictModel,
}
