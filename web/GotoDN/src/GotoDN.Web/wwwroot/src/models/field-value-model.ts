import {FieldStructureModel} from "./field-structure-model";
import {ImageModel} from "./ImageModel";
export interface FieldValueModel {
  Id: number,
  MyAdId?: number,
  ValueNumber?: number,
  ValueString?: string,
  Value?: any,
  FieldStructure?: FieldStructureModel,
  ValidateResult?: ValidateResultModel
}

export interface ValidateResultModel {
  IsInvalid: boolean,
  InvalidMessage: string
}

export interface ImageSetValueModel {
  images: ImageModel[]
}