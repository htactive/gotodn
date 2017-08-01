import {ValidateRuleModel} from "./validate-rule";
export interface  FieldStructureModel {
  Name: string,
  FieldName: string,
  ObjectSetter?: (obj: any, value: any) => void,
  ObjectGetter?: (obj: any) => any
  Type: FieldStructureTypeEnums,
  PlaceHolder: string,
  FieldData?: any,
  ValidateRules?: ValidateRuleModel[]
}

export interface SelectInitValueModel {
  Text: string,
  Value: string,
  IsSelected?: boolean
}


export enum FieldStructureTypeEnums
{
  TextBox = 1,
  RadioGroup = 2,
  CheckBox = 3,
  TextArea = 4,
  DropDownList = 5,
  Toggle = 6,
  Number = 7,
  SingleImage = 8,
  RichTextEdit = 9,
  ObjectSection = 10,
  PageLayoutConfiguration = 11,
  StaticLabel = 12,
  StaticControl = 13,
  Calendar = 14,
  C_Splitter = 100,
  C_PriceSet = 101,
  C_ImagesUpload = 102,
  C_LocationPicker = 103,
  C_Title = 104,
  C_Description = 105,
  C_MoreInfo = 106,
  D_DummyDnd = 1000,
  MaskTextBox = 15,
  Rating = 16,

}