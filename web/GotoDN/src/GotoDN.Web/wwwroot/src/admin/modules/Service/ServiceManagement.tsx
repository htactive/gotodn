import * as React from 'react';
import HTServiceList from "../../components/ServiceManagement/ServiceList";
import {HTServiceInstance} from "../../services/HTService";
import HTServiceDetail from "../../components/ServiceManagement/ServiceDetail";
import {HTServiceModel} from "../../../models/HTServiceModel";
import {LanguageEnums} from "../../../commons/constant";
import {HTServiceLanguageModel} from "../../../models/HTServiceLanguageModel";
import {CategoryModel} from "../../../models/CategoryModel";
import {CategoryServiceInstance} from "../../services/CategoryService";
import {SweetAlertResultEnums, SweetAlerts, SweetAlertTypeEnums} from "../../../commons/sweet-alerts";
import * as _ from 'lodash';

interface thisState {
  Categories?: CategoryModel[],
  HTServices?: HTServiceModel[],
  SelectedHTService?: HTServiceModel,
  SelectedLanguage?: LanguageEnums
}

class HTServiceManagement extends React.Component<{}, thisState> {
  state: thisState = {
    SelectedLanguage: LanguageEnums.English,
    HTServices: [],
  };

  setState(state: thisState) {
    super.setState(state);
  }

  componentDidMount() {
    (async () => {
      this.setState({
        HTServices: await HTServiceInstance.GetAll()
      });
    })();
    (async () => {
      let cates = await CategoryServiceInstance.GetAll();
      if (cates && cates.length > 0) {
        cates = cates.filter(c => !c.IsGovernment);
      }
      this.setState({
        Categories: cates
      });
    })();
  }

  private async createHTService() {
    let result = await HTServiceInstance.CreateHTService();
    if (result) {
      this.setState({
        SelectedHTService: result,
        SelectedLanguage: result.HTServiceLanguages ? result.HTServiceLanguages[0].Language : LanguageEnums.English,
      });
      this.forceUpdate();
    }
    else {
      window['notice_error']();
    }
  }

  private async updateHTService() {
    let eng = this.state.SelectedHTService.HTServiceLanguages.filter(x => x.Language == LanguageEnums.English)[0];
    let icon = eng.Icon;
    let img = eng.Image;
    this.state.SelectedHTService.HTServiceLanguages.map(x => {
      if (x && x.Language != LanguageEnums.English) {
        x.Icon = icon;
        x.Image = img;
      }
    });

    let result = await HTServiceInstance.UpdateHTService(this.state.SelectedHTService);
    if (result) {
      this.setState({
        SelectedHTService: result,
        HTServices: await HTServiceInstance.GetAll()
      });
      window['notice_save_success']();
    }
    else {
      window['notice_error']();
    }
  }

  private async deleteHTService(Id: number) {
    if (await SweetAlerts.show({
        type: SweetAlertTypeEnums.Warning,
        title: 'Xác nhận xóa',
        text: 'Bạn có chắc muốn xóa dịch vụ này?',
        showCancelButton: true,
        confirmButtonText: 'Đồng ý xóa',
        closeOnConfirm: true
      }) == SweetAlertResultEnums.Confirm) {
      let result = await HTServiceInstance.DeleteHTService(Id);
      if (result) {
        window['notice_delete_success']();
        this.setState({
          HTServices: this.state.HTServices.filter(x => x.Id != Id),
        });
        if(!this.state.SelectedHTService || this.state.SelectedHTService.Id == Id) {
          this.setState({
            SelectedHTService: null,
            SelectedLanguage: null
          });
        }
      }
      else {
        window['notice']('error-notice', 'Lỗi', 'Không thể xóa được bản ghi vì bản ghi được sử dụng trong hệ thống, bạn chỉ có thể xóa được bản ghi nếu nó không được sử dụng trong hệ thống.', 'glyphicon glyphicon-remove');
      }
    }
  }

  private async addHTServiceLanguage(lang: LanguageEnums) {
    if (lang == LanguageEnums.All) {
      let result = await HTServiceInstance.AddAllLanguage(this.state.SelectedHTService.Id);
      if (result) {
        window['notice_create_success']();
        this.setState({SelectedHTService: result});
      }
      else {
        window['notice_error']();
      }
    }
    else {
      let HTServiceLanguage: HTServiceLanguageModel = {
        Id: 0,
        Title: "",
        HTServiceId: this.state.SelectedHTService.Id,
        Language: lang,
      };
      let result = await HTServiceInstance.AddLanguage(HTServiceLanguage);
      if (result) {
        window['notice_create_success']();
        this.state.SelectedHTService.HTServiceLanguages.push(result);
        this.setState({
          SelectedLanguage: lang,
        });
      }
      else {
        window['notice_error']();
      }
    }
  }

  private async deleteHTServiceLanguage(Id: number) {
    if (await SweetAlerts.show({
        type: SweetAlertTypeEnums.Warning,
        title: 'Xác nhận xóa',
        text: 'Bạn có chắc muốn xóa ngôn ngữ này?',
        showCancelButton: true,
        confirmButtonText: 'Đồng ý xóa',
        closeOnConfirm: true
      }) == SweetAlertResultEnums.Confirm) {
      let result = await HTServiceInstance.DeleteLanguage(Id);
      if (result) {
        window['notice_delete_success']();
        this.state.SelectedHTService.HTServiceLanguages = this.state.SelectedHTService.HTServiceLanguages
          .filter(x => x.Id != Id);
        this.setState({SelectedLanguage: LanguageEnums.English})
        this.forceUpdate();
      }
      else {
        window['notice_error']();
      }
    }
  }

  private ClickSlectCategory(Id: number) {
    this.state.SelectedHTService.CategoryId = Id;
    this.forceUpdate();
  }

  render() {
    return (
      <div className="page-content-wrapper">
        <div className={`page-content-inner`}>
          <div id="page-header" className="clearfix">
            <div className="page-header">
              <h2>Dịch vụ</h2>
              <span className="txt">Quản lý dịch vụ</span>
            </div>
            <div className="header-stats">
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="panel panel-default plain toggle panelMove">
                <div className="panel-body">
                  <HTServiceList HTServices={this.state.HTServices}
                                 SelectedHTService={this.state.SelectedHTService}
                                 ChangeSelectedService={(model) => this.setState({
                                   SelectedHTService: model,
                                   SelectedLanguage: LanguageEnums.English,
                                 })}
                                 DeleteService={(Id: number) => this.deleteHTService(Id)}
                                 Categories={this.state.Categories || []}
                                 CreateHTService={() => this.createHTService()}
                  />
                  <HTServiceDetail SelectedHTService={this.state.SelectedHTService}
                                   SelectedLanguage={this.state.SelectedLanguage}
                                   ChangeSelectedLanguage={(language) => this.setState({
                                     SelectedLanguage: language,
                                   })}
                                   OnHTServiceLanguageChange={(obj: HTServiceLanguageModel) => {
                                     for (let i = 0; i < this.state.SelectedHTService.HTServiceLanguages.length; i++) {
                                       if (this.state.SelectedHTService.HTServiceLanguages[i].Language == obj.Language) {
                                         this.state.SelectedHTService.HTServiceLanguages[i] = obj;
                                         break;
                                       }
                                     }
                                     this.forceUpdate();
                                   }}
                                   cancelService={() => {
                                     this.setState({
                                       SelectedLanguage: LanguageEnums.English,
                                       SelectedHTService: null,
                                     })
                                   }}
                                   SaveHTService={() => this.updateHTService()}
                                   DeleteHTService={(Id: number) => this.deleteHTService(Id)}
                                   AddHTServiceLanguage={(lang: LanguageEnums) => this.addHTServiceLanguage(lang)}
                                   DeleteHTServiceLanguage={(Id: number) => this.deleteHTServiceLanguage(Id)}
                                   Categories={this.state.Categories || []}
                                   ClickSlectCategory={(Id) => this.ClickSlectCategory(Id)}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default HTServiceManagement;