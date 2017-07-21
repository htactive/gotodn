import {virtualPath} from "../../commons/constant";
import {AdminServiceBase} from "./admin-service-base";
import {ImageModel} from "../../models/ImageModel";

class ImageService extends AdminServiceBase {
  public async uploadNewImage(image): Promise<ImageModel> {
    let url = `${virtualPath}/Image/upload-new-image`;
    return await super.executeFetchPostImage(url, image);
  }

  public async uploadNewIcon(icon): Promise<ImageModel> {
    let url = `${virtualPath}/Image/upload-new-icon`;
    return await super.executeFetchPostImage(url, icon);
  }
}

const ImageServiceInstance = new ImageService();
export {ImageServiceInstance};