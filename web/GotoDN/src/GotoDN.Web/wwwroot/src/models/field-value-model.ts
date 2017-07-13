import {FieldStructureModel} from "./field-structure-model";
export interface FieldValueModel {
  Id: number,
  MyAdId?: number,
  ValueNumber?: number,
  Value?: any,
  FieldStructure?: FieldStructureModel,
  ValidateResult?: ValidateResultModel
}

export interface ValidateResultModel {
  IsInvalid: boolean,
  InvalidMessage: string
}
