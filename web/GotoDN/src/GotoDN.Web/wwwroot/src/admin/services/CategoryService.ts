import {virtualPath} from "../../commons/constant";
import {AdminServiceBase} from "./admin-service-base";
import {CategoryModel} from "../../models/CategoryModel";

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
}

const CategoryServiceInstance = new CategoryService();
export {CategoryServiceInstance};