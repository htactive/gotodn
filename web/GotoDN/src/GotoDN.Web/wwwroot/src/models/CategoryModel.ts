
import {CategoryLanguageModel} from "./CategoryLanguageModel";
export interface CategoryModel {
  Id: number,
  CreatedDate?:Date,
  UpdatedDate?:Date,
  Priority?:number,
  CategoryLanguages?:CategoryLanguageModel[]
}
