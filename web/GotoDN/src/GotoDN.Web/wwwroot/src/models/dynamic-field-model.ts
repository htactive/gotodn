import {FieldStructureModel} from "./field-structure-model";
import {DynamicFormModel} from "./dynamic-form-model";
export interface DynamicFieldModel {
  DynamicFormId?: number,
  FieldStructure?: FieldStructureModel,
  DynamicForm?: DynamicFormModel,
  Priority?:number
}