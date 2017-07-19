import {PlaceLanguageModel} from "./PlaceLanguageModel";
import {CategoryModel} from "./CategoryModel";
import {HTServiceModel} from "./HTServiceModel";
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

  Address?: string
  City?: string
  CloseTime?: Date,
  District?: string
  EndDate?: Date,
  IsCategorySlider?: boolean,
  IsHomeSlider?: boolean,
  Latitude?: number,
  Longitude?: number,
  OpenTime?: Date,
  Phone?: string,
  Rating?: number,
  StartDate?: Date,
  Website?: string,
}
