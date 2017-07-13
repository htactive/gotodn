import {virtualPath} from "../../commons/constant";
import {AdminServiceBase} from "./admin-service-base";
import {ImageModel} from "../../models/ImageModel";

class ImageService extends AdminServiceBase {
  public async uploadNewImage(image): Promise<ImageModel> {
    let url = `${virtualPath}/Image/upload-new-image`;
    return await super.executeFetchPostImage(url, image);
  }
}

const ImageServiceInstance = new ImageService();
export {ImageServiceInstance};