
import {DynamicFieldModel} from "./dynamic-field-model";
export interface DynamicFormModel {
  Title: string,
  Priority?: number,
  Icon: string,
  BlankPanel?:boolean,
  DynamicFields?: DynamicFieldModel[]
}