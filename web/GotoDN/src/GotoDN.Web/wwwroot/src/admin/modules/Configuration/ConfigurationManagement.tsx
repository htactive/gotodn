import * as React from 'react';
import {ConfigurationServiceInstance} from "../../services/ConfigurationService";
import {GDNConfigurationModel} from "../../../models/GDNConfigurationModel";

interface thisState {
  NumOfScreenShowAd?: number
}

export class ConfigurationManagement extends React.Component<{}, thisState>{
  state: thisState = {};

  NumOfScreens = [5,8,10,15];

  componentWillMount() {
    this.setState({
      NumOfScreenShowAd: 5,
    });
  }

  componentDidMount() {
    this.getConfiguration();
  }

  render() {
    return (
      <div className="page-content-wrapper">
        <div className={`page-content-inner`}>
          <div id="page-header" className="clearfix">
            <div className="page-header">
              <h2>Cấu hình</h2>
              <span className="txt">Quản lý cấu hình</span>
            </div>
            <div className="header-stats">
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="panel panel-default plain toggle panelMove  ">
                <div className="panel-body">

                  <form className="form-horizontal">

                    <div className="form-group">
                      <label className="col-lg-4 col-md-4 control-label">
                        Số lần chuyển màn hình để hiển thị quảng cáo: </label>
                      <div className="col-lg-2 col-md-2">
                        <select className="form-control" onChange={(e) => this.changeConfiguration(e)}>
                          {this.NumOfScreens.map((data,index) =>
                            <option value={data} selected={data == this.state.NumOfScreenShowAd}>
                              {data}
                            </option>
                          )}
                        </select>
                      </div>
                    </div>
                    <div className="form-group">
                      <div className="col-lg-offset-4 col-sm-2">
                        <button type="button" className="btn btn-success" style={{minWidth: 80}} onClick={() => this.saveConfiguration()}>Lưu</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  private async getConfiguration() {
    let config = await ConfigurationServiceInstance.GetConfiguration();
    this.setState({
      NumOfScreenShowAd: config.NumOfScreenShowAd,
    });
  }

  private changeConfiguration(e: any) {
    this.setState({
      NumOfScreenShowAd:  parseInt(e.target.value),
    });
  }

  private async saveConfiguration() {
    let model: GDNConfigurationModel = {
      Id: 0,
      NumOfScreenShowAd: this.state.NumOfScreenShowAd,
    };
    let result = await ConfigurationServiceInstance.SaveConfiguration(model);
    if(result) {
      window['notice_save_success']();
    }
  }
}