import {CategoryLanguageModel} from "./CategoryLanguageModel";
export interface CategoryModel {
  Id: number,
  CreatedDate?: Date,
  UpdatedDate?: Date,
  IsEvent?: boolean,
  Priority?: number,
  CategoryLanguages?: CategoryLanguageModel[]
}
