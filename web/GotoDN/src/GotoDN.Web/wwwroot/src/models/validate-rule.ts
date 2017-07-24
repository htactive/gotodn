import {FieldStructureModel} from "./field-structure-model";
import {ValidateRuleTypeEnums} from "../commons/constant";
export interface ValidateRuleModel {
  Id?: number,
  FieldStructureId?: number,
  FieldStructure?: FieldStructureModel,
  Type?: ValidateRuleTypeEnums,
  RuleData?: string,
  InValidMessage?: string
}