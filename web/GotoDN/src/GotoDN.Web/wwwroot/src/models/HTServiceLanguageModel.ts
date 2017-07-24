import {HTServiceModel} from "./HTServiceModel";
import {ImageModel} from "./ImageModel";
import {LanguageEnums} from "../commons/constant";
export interface HTServiceLanguageModel {
  Id: number,
  HTServiceId?: number,
  Title?: string,
  IconId?: number,
  ImageId?: number,
  CreatedDate?: Date,
  UpdatedDate?: Date,
  Language?: LanguageEnums,
  Category?: HTServiceModel,
  Image?: ImageModel,
  Icon?: ImageModel
}
