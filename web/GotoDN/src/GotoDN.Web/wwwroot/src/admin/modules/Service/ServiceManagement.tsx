import * as React from 'react';
import HTServiceList from "../../components/ServiceManagement/ServiceList";
import {HTServiceInstance} from "../../services/HTService";
import HTServiceDetail from "../../components/ServiceManagement/ServiceDetail";
import {HTServiceModel} from "../../../models/HTServiceModel";
import {LanguageEnums} from "../../../commons/constant";
import {HTServiceLanguageModel} from "../../../models/HTServiceLanguageModel";
import {CategoryModel} from "../../../models/CategoryModel";
import {CategoryServiceInstance} from "../../services/CategoryService";
interface thisState {
  Categories?: CategoryModel[],
  HTServices?: HTServiceModel[],
  SelectedHTService?: HTServiceModel,
  SelectedLanguage?: LanguageEnums
}
class HTServiceManagement extends React.Component<{}, thisState> {
  state: thisState = {
    SelectedLanguage: LanguageEnums.Vietnamese,
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
      this.setState({
        Categories: await CategoryServiceInstance.GetAll()
      });
    })();
  }

  private async createHTService() {
    let result = await HTServiceInstance.CreateHTService();
    if (result) {
      if (this.state.HTServices) {
        this.state.HTServices.push(result);
        this.setState({
          SelectedHTService: result,
          SelectedLanguage: result.HTServiceLanguages ? result.HTServiceLanguages[0].Language : LanguageEnums.Vietnamese,
        })
        this.forceUpdate();
      }
    }
  }

  private async updateHTService() {
    let result = await HTServiceInstance.UpdateHTService(this.state.SelectedHTService);
    if (result) {

    }
  }

  private async deleteHTService(Id: number) {
    let result = await HTServiceInstance.DeleteHTService(Id);
    if (result) {
      this.setState({
        HTServices: this.state.HTServices.filter(x => x.Id != Id),
        SelectedHTService: null,
        SelectedLanguage: null
      });
    }
  }

  private async addHTServiceLanguage(lang: LanguageEnums) {
    let HTServiceLanguage: HTServiceLanguageModel = {
      Id: 0,
      Title: "",
      HTServiceId: this.state.SelectedHTService.Id,
      Language: lang,
    };

    let result = await HTServiceInstance.AddLanguage(HTServiceLanguage);
    if (result) {
      this.state.SelectedHTService.HTServiceLanguages.push(result);
      this.setState({
        SelectedLanguage: lang,
      });
    }
  }

  private async deleteHTServiceLanguage(Id: number) {
    let result = await HTServiceInstance.DeleteLanguage(Id);
    if (result) {
      this.state.SelectedHTService.HTServiceLanguages = this.state.SelectedHTService.HTServiceLanguages
        .filter(x => x.Id != Id);
      this.setState({SelectedLanguage: LanguageEnums.Vietnamese})
      this.forceUpdate();
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
                                   SelectedLanguage: LanguageEnums.Vietnamese,
                                 })}
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