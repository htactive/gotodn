import {virtualPath} from "../../commons/constant";
import {AdminServiceBase} from "./admin-service-base";
import {CategoryModel} from "../../models/CategoryModel";
import {CategoryLanguageModel} from "../../models/CategoryLanguageModel";

class CategoryService extends AdminServiceBase {
  async GetAll(): Promise<CategoryModel[]> {
    let url = `${virtualPath}/category/get-all`;
    return await super.executeFetch(url);
  }

  async CreateCategory(): Promise<CategoryModel> {
    let url = `${virtualPath}/category/create-category`;
    return await super.executeFetchPost(url, null);
  }

  async UpdateCategory(model: CategoryModel): Promise<boolean> {
    let url = `${virtualPath}/category/update-category`;
    return await super.executeFetchPost(url, model);
  }

  async DeleteCategory(Id: number): Promise<boolean> {
    let url = `${virtualPath}/category/delete-category`;
    return await super.executeFetchPost(url, Id);
  }

  async AddLanguage(model: CategoryLanguageModel): Promise<CategoryLanguageModel> {
    let url = `${virtualPath}/category/add-language`;
    return await super.executeFetchPost(url, model);
  }

  async DeleteLanguage(Id: number): Promise<boolean> {
    let url = `${virtualPath}/category/delete-language`;
    return await super.executeFetchPost(url, Id);
  }

  async TranslateCategory(cateModel: CategoryModel): Promise<CategoryLanguageModel> {
    let url = `${virtualPath}/category/translate-category-language`;
    return await super.executeFetchPost(url, cateModel);
  }

  async TranslateAllCategory(model: CategoryModel): Promise<CategoryModel> {
    let url = `${virtualPath}/category/translate-all-category-language`;
    return await super.executeFetchPost(url, model);
  }

  async OrderCategory(cateIds: number[]): Promise<CategoryModel[]> {
    let url = `${virtualPath}/category/order-category`;
    return await super.executeFetchPost(url, cateIds);
  }
}

const CategoryServiceInstance = new CategoryService();
export {CategoryServiceInstance};