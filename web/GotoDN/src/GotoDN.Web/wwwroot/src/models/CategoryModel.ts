import {CategoryLanguageModel} from "./CategoryLanguageModel";
import {HTServiceModel} from "./HTServiceModel";
export interface CategoryModel {
  Id: number,
  CreatedDate?: Date,
  UpdatedDate?: Date,
  IsEvent?: boolean,
  IsGovernment?: boolean,
  Order?: number,
  CategoryLanguages?: CategoryLanguageModel[],
  HTServices?: HTServiceModel[]
}
