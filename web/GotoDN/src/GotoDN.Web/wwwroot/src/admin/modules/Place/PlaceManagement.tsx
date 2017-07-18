import * as React from 'react';
import PlaceList from "../../components/PlaceManagement/PlaceList";
import {PlaceServiceInstance} from "../../services/PlaceService";
import PlaceDetail from "../../components/PlaceManagement/PlaceDetail";
import {PlaceModel} from "../../../models/PlaceModel";
import {LanguageEnums} from "../../../commons/constant";
import {PlaceLanguageModel} from "../../../models/PlaceLanguageModel";
import {CategoryModel} from "../../../models/CategoryModel";
import {HTServiceModel} from "../../../models/HTServiceModel";
import {CategoryServiceInstance} from "../../services/CategoryService";
import {HTServiceInstance} from "../../services/HTService";
interface thisState {
  Places?: PlaceModel[],
  Categories?: CategoryModel[],
  HTServices?: HTServiceModel[],
  SelectedPlace?: PlaceModel,
  SelectedLanguage?: LanguageEnums
}
class PlaceManagement extends React.Component<{}, thisState> {
  state: thisState = {
    SelectedLanguage: LanguageEnums.Vietnamese,
    Places: [],
  };

  setState(state: thisState) {
    super.setState(state);
  }

  componentDidMount() {
    (async () => {
      this.setState({
        Places: await PlaceServiceInstance.GetAll()
      });
    })();
    (async () => {
      this.setState({
        Categories: await CategoryServiceInstance.GetAll()
      });
    })();
    (async () => {
      this.setState({
        HTServices: await HTServiceInstance.GetAll()
      });
    })();
  }

  private async createPlace() {
    let result = await PlaceServiceInstance.CreatePlace();
    if (result) {
      result.Address = "";
      result.City = "";
      result.CloseTime = null;
      result.District = "";
      result.EndDate = null;
      result.IsCategorySlider = false;
      result.IsHomeSlider = false;
      result.Latitude = null;
      result.Longitude = null;
      result.OpenTime = null;
      result.Phone = "";
      result.Rating = null;
      result.StartDate = null;
      result.Website = "";
      if (this.state.Places) {
        this.state.Places.push(result);
        this.setState({
          SelectedPlace: result,
          SelectedLanguage: result.PlaceLanguages ? result.PlaceLanguages[0].Language : LanguageEnums.Vietnamese,
        })
        this.forceUpdate();
      }
    }
  }

  private async updatePlace(model: PlaceModel) {
    let result = await PlaceServiceInstance.UpdatePlace(model);
    if (result) {

    }
  }

  private async deletePlace(Id: number) {
    let result = await PlaceServiceInstance.DeletePlace(Id);
    if (result) {
      this.setState({
        Places: this.state.Places.filter(x => x.Id != Id),
        SelectedPlace: null,
        SelectedLanguage: null
      });
    }
  }

  private async addPlaceLanguage(lang: LanguageEnums) {
    let PlaceLanguage: PlaceLanguageModel = {
      Id: 0,
      Title: "",
      PlaceId: this.state.SelectedPlace.Id,
      Language: lang,
    };

    let result = await PlaceServiceInstance.AddLanguage(PlaceLanguage);
    if (result) {
      this.state.SelectedPlace.PlaceLanguages.push(result);
      this.setState({
        SelectedLanguage: lang,
      });
    }
  }

  private async deletePlaceLanguage(Id: number) {
    let result = await PlaceServiceInstance.DeleteLanguage(Id);
    if (result) {
      this.state.SelectedPlace.PlaceLanguages = this.state.SelectedPlace.PlaceLanguages
        .filter(x => x.Id != Id);
      this.setState({SelectedLanguage: LanguageEnums.Vietnamese})
      this.forceUpdate();
    }
  }

  private ClickSlectCategory(Id: any) {
    this.state.SelectedPlace.CategoryId = Id;
    this.forceUpdate();
  }

  render() {
    return (
      <div className="page-content-wrapper">
        <div className={`page-content-inner`}>
          <div id="page-header" className="clearfix">
            <div className="page-header">
              <h2>Địa điểm</h2>
              <span className="txt">Quản lý địa điểm</span>
            </div>
            <div className="header-stats">
            </div>
          </div>
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="panel panel-default plain toggle panelMove">
                <div className="panel-body">
                  <PlaceList
                    Places={this.state.Places}
                    SelectedPlace={this.state.SelectedPlace}
                    ChangeSelectedPlace={(model) => this.setState({
                      SelectedPlace: model,
                      SelectedLanguage: LanguageEnums.Vietnamese,
                    })}
                    CreatePlace={() => this.createPlace()}
                  />
                  <PlaceDetail SelectedPlace={this.state.SelectedPlace}
                               SelectedLanguage={this.state.SelectedLanguage}
                               ChangeSelectedLanguage={(language) => this.setState({
                                 SelectedLanguage: language
                               })}
                               OnPlaceLanguageChange={(obj: PlaceLanguageModel) => {
                                 for (let i = 0; i < this.state.SelectedPlace.PlaceLanguages.length; i++) {
                                   if (this.state.SelectedPlace.PlaceLanguages[i].Language == obj.Language) {
                                     this.state.SelectedPlace.PlaceLanguages[i] = obj;
                                     break;
                                   }
                                 }
                                 this.forceUpdate();
                               }}
                               SavePlace={(model) => this.updatePlace(model)}
                               DeletePlace={(Id: number) => this.deletePlace(Id)}
                               AddPlaceLanguage={(lang: LanguageEnums) => this.addPlaceLanguage(lang)}
                               DeletePlaceLanguage={(Id: number) => this.deletePlaceLanguage(Id)}
                               Categories={this.state.Categories || []}
                               HTServices={this.state.HTServices || []}
                               ClickSlectCategory={(Id) => this.ClickSlectCategory(Id)}
                               OnPlaceChange={(obj: PlaceModel) => {
                                 this.setState({SelectedPlace: obj});
                               }}
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


export default PlaceManagement;