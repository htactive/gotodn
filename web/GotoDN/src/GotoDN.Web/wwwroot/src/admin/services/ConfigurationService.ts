import {virtualPath} from "../../commons/constant";
import {AdminServiceBase} from "./admin-service-base";
import {GDNConfigurationModel} from "../../models/GDNConfigurationModel";

export class ConfigurationService extends AdminServiceBase {
  async GetConfiguration(): Promise<GDNConfigurationModel> {
    let url = `${virtualPath}/configuration/get-configuration`;
    return await super.executeFetch(url);
  }

  async SaveConfiguration(model: GDNConfigurationModel): Promise<boolean> {
    let url = `${virtualPath}/configuration/save-configuration`;
    return await super.executeFetchPost(url, model);
  }
}

const ConfigurationServiceInstance = new ConfigurationService();
export {ConfigurationServiceInstance};