import {PlaceLanguageModel} from "./PlaceLanguageModel";
export interface PlaceModel {
  Id: number,
  CreatedDate?:Date,
  UpdatedDate?:Date,
  Priority?:number,
  HTServiceId?: number,
  CategoryId?: number,
  PlaceLanguages?:PlaceLanguageModel[]
}
