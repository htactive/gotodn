import * as React from 'react';
import {PlaceServiceInstance} from "../../services/PlaceService";
import PlaceDetail from "../../components/PlaceManagement/PlaceDetail";
import {PlaceModel} from "../../../models/PlaceModel";
import {LanguageEnums} from "../../../commons/constant";
import {PlaceLanguageModel} from "../../../models/PlaceLanguageModel";
import {CategoryModel} from "../../../models/CategoryModel";
import {HTServiceModel} from "../../../models/HTServiceModel";
import {CategoryServiceInstance} from "../../services/CategoryService";
import {HTServiceInstance} from "../../services/HTService";
import {GetGridRequestModel, GetGridResponseModel, ReactTable} from "../../../commons/react-table";
import {TableHeaderColumn} from 'react-bootstrap-table';

interface thisState {
  GridFilter?: GetGridRequestModel,
  GridData?: GetGridResponseModel,
  Categories?: CategoryModel[],
  HTServices?: HTServiceModel[],
  HTServicesBackup?: HTServiceModel[],
  SelectedPlace?: PlaceModel,
  SelectedLanguage?: LanguageEnums,
}
class PlaceManagement extends React.Component<{}, thisState> {
  placeModal: PlaceDetail;
  state: thisState = {
    SelectedLanguage: LanguageEnums.English,
    GridFilter: {
      CurrentPage: 1,
      IsAsc: false,
      SortExpression: "Id",
      PageSize: 10
    }
  };

  setState(state: thisState) {
    super.setState(state);
  }

  componentDidMount() {
    (async () => {
      this.setState({
        Categories: await CategoryServiceInstance.GetAll()
      });
    })();
    (async () => {
      this.setState({
        HTServicesBackup: await HTServiceInstance.GetAll(),
        HTServices: [],
      });
    })();
    this.getData(this.state.GridFilter);
  }

  private async getData(request: GetGridRequestModel) {
    let result = await PlaceServiceInstance.Filter(request);
    if (result) {
      this.setState({GridData: result});
    }
  }

  private async createPlace() {
    let result = await PlaceServiceInstance.CreatePlace();
    if (result) {
      window['notice_save_success']();
      let filter = this.state.GridFilter;
      if (filter) {
        filter.CurrentPage = 1;
        filter.IsAsc = false;
        filter.SortExpression = "Id";
      }
      this.getData(filter);
      this.setState({
        SelectedPlace: result,
        SelectedLanguage: result.PlaceLanguages ? result.PlaceLanguages[0].Language : LanguageEnums.English,
      })
    }
    else {
      window['notice_error']();
    }
  }

  private async updatePlace(model: PlaceModel) {
    let result = await PlaceServiceInstance.UpdatePlace(model);
    if (result) {
      this.getData(this.state.GridFilter);
    }
  }

  private async deletePlace(Id: number) {
    let result = await PlaceServiceInstance.DeletePlace(Id);
    if (result) {
      let filter = this.state.GridFilter;
      if (filter) {
        filter.CurrentPage = this.state.GridData
        && this.state.GridData.DataSource
        && this.state.GridData.DataSource.length <= 1
          ? Math.max(filter.CurrentPage - 1, 1) : filter.CurrentPage
        ;
      }
      this.getData(filter);

      this.setState({
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
      this.setState({SelectedLanguage: LanguageEnums.English});
      this.forceUpdate();
    }
  }

  private ClickSlectCategory(Id: any) {
    this.state.SelectedPlace.CategoryId = Id;
    this.setState({HTServices: this.state.HTServicesBackup.filter(x => x.CategoryId == Id)});
  }

  render() {
    return (
      <div className="page-content-wrapper">
        <div className={`page-content-inner`}>
          <div id="page-header" className="clearfix">
            <div className="page-header">
              <h2>Địa điểm - Sự kiện</h2>
              <span className="txt">Quản lý địa điểm và sự kiện</span>
            </div>
            <div className="header-stats">
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="panel panel-default plain toggle panelMove">
                <div className="panel-body">
                  <div className="table-toolbar">
                    <button className="btn btn-primary" type="button"
                            onClick={() => this.createPlace()}>
                      <i className="fa fa-plus"/> Thêm địa điểm - Sự kiện
                    </button>
                  </div>
                  <ReactTable request={this.state.GridFilter}
                              data={this.state.GridData}
                              trClassName={() => {
                                return ""
                              }}
                              defaultSortName={"Id"}
                              defaultSortOrder={false}
                              onFilterRequest={
                                (request) => {
                                  this.getData(request);
                                  this.setState({GridFilter: request});
                                }}>
                    <TableHeaderColumn width="100" dataField="Name"
                                       dataFormat={(r, data) => this.bindNameData(data)} dataSort={ true }>
                      Tên</TableHeaderColumn>
                    <TableHeaderColumn width="100" dataField="Category" dataAlign="center"
                                       dataFormat={(r, data) => this.bindCategoryData(data)} dataSort={ false }>
                      Category</TableHeaderColumn>
                    <TableHeaderColumn width="100" dataField="Service" dataAlign="center"
                                       dataFormat={(r, data) => this.bindServiceData(data)} dataSort={ false }>
                      Dịch vụ</TableHeaderColumn>
                    <TableHeaderColumn width="100" dataField="City" dataAlign="center"
                                       dataFormat={(r, data) => this.bindCityData(data)} dataSort={ false }>
                      Thành phố</TableHeaderColumn>
                    <TableHeaderColumn width="100" dataField="District" dataAlign="center"
                                       dataFormat={(r, data) => this.bindDistrictData(data)} dataSort={ false }>
                      Quận huyện</TableHeaderColumn>
                    <TableHeaderColumn width="100" dataField="Highlight" dataAlign="center"
                                       dataFormat={(r, data) => this.bindHighlightData(data)} dataSort={ false }>
                      Nổi bật</TableHeaderColumn>
                    <TableHeaderColumn width="100" dataField="StartDate" dataAlign="center"
                                       dataFormat={(r, data) => this.bindStartDateData(data)} dataSort={ false }>
                      Ngày bắt đầu</TableHeaderColumn>
                    <TableHeaderColumn width="100" dataField="EndDate" dataAlign="center"
                                       dataFormat={(r, data) => this.bindEndDateData(data)} dataSort={ false }>
                      Ngày kết thúc</TableHeaderColumn>
                    <TableHeaderColumn width="100" dataField="Ranking" dataAlign="center"
                                       dataFormat={(r, data) => this.bindRankingData(data)} dataSort={ false }>
                      Xếp hạng</TableHeaderColumn>
                  </ReactTable>

                </div>
              </div>
            </div>
          </div>
        </div>
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
                     ClickSlectHTService={(Id) => {
                       this.state.SelectedPlace.HTServiceId = Id;
                       this.forceUpdate();
                     }}
                     ref={e => this.placeModal = e}
        />
      </div>
    );
  }

  private bindNameData(data: PlaceModel) {
    let firstLanguage = data.PlaceLanguages.sort((a, b) => a.Language - b.Language)[0];
    return <a className="btn btn-link"
              onClick={() => {
                this.placeModal.show();
                this.setState({
                  SelectedPlace: data, SelectedLanguage: LanguageEnums.English,
                });
                data && data.CategoryId ?
                  this.setState({HTServices: this.state.HTServicesBackup.filter(x => x.CategoryId == data.CategoryId)})
                  : null;
              }}
    >{(firstLanguage ? firstLanguage.Title : '') || ('Chưa đặt tên')}</a>;
  }

  private bindCategoryData(data: PlaceModel) {
    if (data.Category && data.Category.CategoryLanguages) {
      let firstLanguage = data.Category.CategoryLanguages.sort((a, b) => a.Language - b.Language)[0];
      return <span>{(firstLanguage ? firstLanguage.Title : '') || ('')}</span>;
    }
    return <span></span>;
  }

  private bindServiceData(data: PlaceModel) {
    if (data.HTService && data.HTService.HTServiceLanguages) {
      let firstLanguage = data.HTService.HTServiceLanguages.sort((a, b) => a.Language - b.Language)[0];
      return <span>{(firstLanguage ? firstLanguage.Title : '') || ('')}</span>;
    }
    return <span></span>;
  }

  private bindCityData(data: PlaceModel) {
    return <span>{data.City || ''}</span>;
  }

  private bindDistrictData(data: PlaceModel) {
    return <span>{data.District || ''}</span>;
  }

  private bindHighlightData(data: PlaceModel) {
    return "";
  }

  private bindStartDateData(data: PlaceModel) {
    return "";
  }

  private bindEndDateData(data: PlaceModel) {
    return "";
  }

  private bindRankingData(data: PlaceModel) {
    return <span>{data.Rating || ''}</span>;
  }
}


export default PlaceManagement;