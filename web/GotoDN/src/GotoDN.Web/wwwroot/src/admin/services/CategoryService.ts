import {virtualPath} from "../../commons/constant";
import {AdminServiceBase} from "./admin-service-base";
import {CategoryModel} from "../../models/CategoryModel";

class CategoryService extends AdminServiceBase {
  async GetAll(): Promise<CategoryModel[]> {
    let url = `${virtualPath}/Category/get-all`;
    return await super.executeFetch(url);
  }
}

const CategoryServiceInstance = new CategoryService();
export {CategoryServiceInstance};