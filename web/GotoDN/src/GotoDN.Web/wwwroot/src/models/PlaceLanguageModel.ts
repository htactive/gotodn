import {PlaceModel} from "./PlaceModel";
import {ImageModel} from "./ImageModel";
import {LanguageEnums} from "../commons/constant";
export interface PlaceLanguageModel {
  Id: number,
  PlaceId?: number,
  Title?: string,
  IconId?: number,
  ImageId?: number,
  CreatedDate?: Date,
  UpdatedDate?: Date,
  Language?: LanguageEnums,
  Place?: PlaceModel,
  Image?: ImageModel,
  Icon?: ImageModel,
  CategoryId?: number,
}
