import {virtualPath} from "../../commons/constant";
import {AdminServiceBase} from "./admin-service-base";
import {ImageModel} from "../../models/ImageModel";
import {ImportPlaceModel, ImportPlaceGroupModel} from "../../models/ImportPlaceModel";

class ImageService extends AdminServiceBase {
  public async uploadNewImage(image): Promise<ImageModel> {
    let url = `${virtualPath}/Image/upload-new-image`;
    return await super.executeFetchPostImage(url, image);
  }

  public async uploadNewIcon(icon): Promise<ImageModel> {
    let url = `${virtualPath}/Image/upload-new-icon`;
    return await super.executeFetchPostImage(url, icon);
  }

  public async uploadExcelHL(excel): Promise<ImportPlaceGroupModel[]> {
    let url = `${virtualPath}/Image/import-excel-high-level`;
    return await super.executeFetchPostImage(url, excel);
  }
}

const ImageServiceInstance = new ImageService();
export {ImageServiceInstance};