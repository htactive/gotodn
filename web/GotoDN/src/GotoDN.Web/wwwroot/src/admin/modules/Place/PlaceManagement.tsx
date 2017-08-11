import * as React from 'react';
import {PlaceServiceInstance} from "../../services/PlaceService";
import PlaceDetail from "../../components/PlaceManagement/PlaceDetail";
import {PlaceModel} from "../../../models/PlaceModel";
import {LanguageEnums, TimeHelper, AdminRoutePath} from "../../../commons/constant";
import {PlaceLanguageModel} from "../../../models/PlaceLanguageModel";
import {CategoryModel} from "../../../models/CategoryModel";
import {HTServiceModel} from "../../../models/HTServiceModel";
import {CategoryServiceInstance} from "../../services/CategoryService";
import {HTServiceInstance} from "../../services/HTService";
import {GetGridRequestModel, GetGridResponseModel, ReactTable} from "../../../commons/react-table";
import {TableHeaderColumn} from 'react-bootstrap-table';
import {SweetAlertResultEnums, SweetAlerts, SweetAlertTypeEnums} from "../../../commons/sweet-alerts";
import {CityModel, DistrictModel} from "../../../models/CityModel";
import {CityServiceInstance} from "../../services/CityService";
import {Link, browserHistory} from 'react-router';
import {ImageServiceInstance} from "../../services/image-service";
import {PlaceImportPreview} from "../../components/PlaceManagement/PlaceImportPreview";
import {ImportPlaceGroupModel} from "../../../models/ImportPlaceModel";
import {UIBlocker} from "../../../commons/ui-blocker";

interface thisState {
  GridFilter?: GetGridRequestModel,
  GridData?: GetGridResponseModel,
  Categories?: CategoryModel[],
  HTServices?: HTServiceModel[],
  HTServicesBackup?: HTServiceModel[],
  SelectedPlace?: PlaceModel,
  SelectedLanguage?: LanguageEnums,
  Cities?: CityModel[],
  DistrictsBackup?: DistrictModel[],
  Districts?: DistrictModel[],
  showDetail?: boolean,
  InvalidImportFileType?: boolean,
  ShowImportPreview?: boolean
  ImportData?: ImportPlaceGroupModel[],
}
class PlaceManagement extends React.Component<{}, thisState> {
  btnImageFileInput;

  state: thisState = {
    SelectedLanguage: LanguageEnums.English,
    GridFilter: {
      CurrentPage: 1,
      IsAsc: false,
      SortExpression: "Id",
      PageSize: 10
    },
    ShowImportPreview: false,
    ImportData: [],
  };

  setState(state: thisState) {
    super.setState(state);
  }

  async componentWillMount() {
    await this.getData(this.state.GridFilter);
    await this.componentWillReceiveProps(this.props);
  }

  componentDidMount() {
    (async() => {
      this.setState({
        Categories: await CategoryServiceInstance.GetAll()
      });
    })();
    (async() => {
      this.setState({
        HTServicesBackup: await HTServiceInstance.GetAll(),
        HTServices: [],
      });
    })();
    (async() => {
      this.setState({
        Cities: await CityServiceInstance.GetAllCity()
      });
    })();
    (async() => {
      this.setState({
        DistrictsBackup: await CityServiceInstance.GetAllDistrict(),
        Districts: [],
      });
    })();
  }

  async componentWillReceiveProps(props) {
    if (!props.params['id']) {
      this.setState({showDetail: false});
      return
    }
    if (!this.state.GridData) return;
    // let data = this.state.GridData.DataSource.filter(x => x.Id == props.params['id'])[0];
    let data = await PlaceServiceInstance.GetPlace(props.params['id']);
    this.setState({
      SelectedPlace: data,
      SelectedLanguage: LanguageEnums.English,
      showDetail: true,
    });
    data && data.CategoryId ?
      this.setState({HTServices: this.state.HTServicesBackup.filter(x => x.CategoryId == data.CategoryId)})
      : null;
    data && data.CityId ?
      this.setState({Districts: this.state.DistrictsBackup.filter(x => x.CityId == data.CityId)})
      : null;

  }

  private async getData(request: GetGridRequestModel) {
    let result = await PlaceServiceInstance.Filter(request);
    if (result) {
      this.setState({GridData: result});
    }
  }

  private async createPlace() {
    browserHistory.push(AdminRoutePath.PlaceManagement + '/0');
  }

  private async updatePlace(model: PlaceModel) {
    let eng = model.PlaceLanguages.filter(x => x.Language == LanguageEnums.English)[0];
    let icon = eng.Icon;
    let img = eng.Image;
    model.PlaceLanguages.map( x => {
      if(x && x.Language != LanguageEnums.English)
      {
        x.Icon = icon;
        x.Image = img;
      }
    });
    let result = await PlaceServiceInstance.UpdatePlace(model);
    if (result) {
      window['notice_save_success']();
      this.getData(this.state.GridFilter);
      browserHistory.push(AdminRoutePath.PlaceManagement);
    }
    else {
      window['notice_error']();
    }
  }

  private async deletePlace(Id: number) {
    if (await SweetAlerts.show({
        type: SweetAlertTypeEnums.Warning,
        title: 'Xác nhận xóa',
        text: 'Bạn có chắc muốn xóa?',
        showCancelButton: true,
        confirmButtonText: 'Đồng ý xóa',
        closeOnConfirm: true
      }) == SweetAlertResultEnums.Confirm) {
      let result = await PlaceServiceInstance.DeletePlace(Id);
      if (result) {
        window['notice_delete_success']();
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
          SelectedLanguage: null,
        });
        browserHistory.push(AdminRoutePath.PlaceManagement);
      }
      else {
        window['notice_error']();
      }
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
      window['notice_create_success']();
      this.state.SelectedPlace.PlaceLanguages.push(result);
      this.setState({
        SelectedLanguage: lang,
      });
    }
    else {
      window['notice_error']();
    }
  }

  private async deletePlaceLanguage(Id: number) {
    if (await SweetAlerts.show({
        type: SweetAlertTypeEnums.Warning,
        title: 'Xác nhận xóa',
        text: 'Bạn có chắc muốn xóa ngôn ngữ này?',
        showCancelButton: true,
        confirmButtonText: 'Đồng ý xóa',
        closeOnConfirm: true
      }) == SweetAlertResultEnums.Confirm) {
      let result = await PlaceServiceInstance.DeleteLanguage(Id);
      if (result) {
        window['notice_delete_success']();
        this.state.SelectedPlace.PlaceLanguages = this.state.SelectedPlace.PlaceLanguages
          .filter(x => x.Id != Id);
        this.setState({SelectedLanguage: LanguageEnums.English});
        this.forceUpdate();
      }
      else {
        window['notice_error']();
      }
    }
  }

  private ClickSlectCategory(Id: any) {
    this.state.SelectedPlace.CategoryId = Id;
    this.setState({HTServices: this.state.HTServicesBackup.filter(x => x.CategoryId == Id)});
  }

  render() {
    let highlightSelecter = {
      1: 'Có',
      0: 'Không'
    };
    return (
      <div className="page-content-wrapper">
        <div className={`page-content-inner ${this.state.showDetail ? "hidden" : null}`}>
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
                <div className="panel-body place-body">
                  <div className="table-toolbar">
                    <button className="btn btn-primary" type="button"
                            onClick={() => this.createPlace()}>
                      <i className="fa fa-plus"/> Thêm địa điểm - Sự kiện
                    </button>
                    <button className="btn btn-success mr10 ml10" type="button"
                            onClick={() => this.importExcelHL()}>
                      <i className="fa fa-upload"/> Nhập từ Excel
                    </button>
                    <a className="btn btn-success mr10" href="place/download-template-high-level"
                            >
                      <i className="fa fa-download"/> Download Template
                    </a>
                  </div>
                  <input className="hidden" type="file" multiple={false}
                         accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
                         ref={(r) => this.btnImageFileInput = r}
                         onChange={(e) => this.handleFilePicked(e)}
                  />
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
                    <TableHeaderColumn width="150" dataField="Name" filter={{type: 'TextFilter'}}
                                       dataFormat={(r, data) => this.bindNameData(data)} dataSort={true}>
                      Tên</TableHeaderColumn>
                    <TableHeaderColumn width="150" dataField="Category" dataAlign="center"
                                       filter={{type: 'TextFilter'}}
                                       dataFormat={(r, data) => this.bindCategoryData(data)} dataSort={true}>
                      Danh mục</TableHeaderColumn>
                    <TableHeaderColumn width="150" dataField="Service" dataAlign="center"
                                       filter={{type: 'TextFilter'}}
                                       dataFormat={(r, data) => this.bindServiceData(data)} dataSort={true}>
                      Dịch vụ</TableHeaderColumn>
                    <TableHeaderColumn width="150" dataField="City" dataAlign="center"
                                       filter={{type: 'TextFilter'}}
                                       dataFormat={(r, data) => this.bindCityData(data)} dataSort={true}>
                      Thành phố</TableHeaderColumn>
                    <TableHeaderColumn width="150" dataField="District" dataAlign="center"
                                       filter={{type: 'TextFilter'}}
                                       dataFormat={(r, data) => this.bindDistrictData(data)} dataSort={true}>
                      Quận huyện</TableHeaderColumn>
                    <TableHeaderColumn width="120" dataField="HomeHighlight" dataAlign="center"
                                       filterFormatted formatExtraData={highlightSelecter}
                                       filter={{type: 'SelectFilter', options: highlightSelecter}}
                                       dataFormat={(r, data) => this.bindHighlightData(data.IsHomeSlider)} dataSort={true}>
                      Nổi bật trang chủ</TableHeaderColumn>
                    <TableHeaderColumn width="120" dataField="CategoryHighlight" dataAlign="center"
                                       filterFormatted formatExtraData={highlightSelecter}
                                       filter={{type: 'SelectFilter', options: highlightSelecter}}
                                       dataFormat={(r, data) => this.bindHighlightData(data.IsCategorySlider)} dataSort={true}>
                      Nổi bật thư mục</TableHeaderColumn>
                    <TableHeaderColumn width="120" dataField="IsEvent" dataAlign="center"
                                       filterFormatted formatExtraData={highlightSelecter}
                                       filter={{type: 'SelectFilter', options: highlightSelecter}}
                                       dataFormat={(r, data) => this.bindHighlightData(data.IsEvent)} dataSort={true}>
                      Sự kiện</TableHeaderColumn>
                    <TableHeaderColumn width="200" dataField="StartDate" dataAlign="center"
                                       filter={{type: 'DateFilter'}}
                                       dataFormat={(r, data) => this.bindStartDateData(data)} dataSort={true}>
                      Ngày bắt đầu</TableHeaderColumn>
                    <TableHeaderColumn width="200" dataField="EndDate" dataAlign="center"
                                       filter={{type: 'DateFilter'}}
                                       dataFormat={(r, data) => this.bindEndDateData(data)} dataSort={true}>
                      Ngày kết thúc</TableHeaderColumn>
                    <TableHeaderColumn width="100" dataField="Ranking" dataAlign="center"
                                       filter={{type: 'TextFilter'}}
                                       dataFormat={(r, data) => this.bindRankingData(data)} dataSort={true}>
                      Đánh giá</TableHeaderColumn>
                    <TableHeaderColumn width="80" dataField="Action" dataAlign="center"
                                       dataFormat={(r, data) => this.bindActionData(data)} dataSort={ false }>
                      Thao tác</TableHeaderColumn>
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
                     Cities={this.state.Cities || []}
                     Districts={this.state.Districts || []}
                     ClickSlectCity={(Id) => {
                       this.state.SelectedPlace.CityId = Id;
                       this.setState({Districts: this.state.DistrictsBackup.filter(x => x.CityId == Id)});
                     }}
                     ClickSlectDistrict={(Id) => {
                       this.state.SelectedPlace.DistrictId = Id;
                       this.forceUpdate();
                     }}
                     onEndDateChange={(e) => {
                       this.state.SelectedPlace.EndDate = e;
                       this.forceUpdate();
                     }}
                     onStartDateChange={(e) => {
                       this.state.SelectedPlace.StartDate = e;
                       this.forceUpdate();
                     }}
                     onGovernmentChanged={(value: boolean) => {
                       this.state.SelectedPlace.IsDistrictGovernment = value;
                       this.forceUpdate();
                     }}
                     isShow={this.state.showDetail}
                     clickGoBack={() => {
                       browserHistory.push(AdminRoutePath.PlaceManagement);
                     }}
        />
        <div className="place-preview">
          <PlaceImportPreview
            ImportData={this.state.ImportData}
            IsShow={this.state.ShowImportPreview}
            onModalClosed={() => this.setState({ShowImportPreview: false})}
            onImportData={() => this.handleImportData()}
          />
        </div>
      </div>
    );
  }

  private bindNameData(data: any) {

    return <Link className="btn btn-link"
                 to={`${AdminRoutePath.PlaceManagement}/${data.Id}`}>{data.Title}</Link>;
  }

  private bindCategoryData(data: any) {
    if (data.CategoryName) {
      return <span>{data.CategoryName}</span>;
    }
    return <span></span>;
  }

  private bindServiceData(data: any) {
    if (data.ServiceName) {
      return <span>{data.ServiceName}</span>;
    }
    return <span></span>;
  }

  private bindCityData(data: any) {
    return <span>{data.City}</span>;
  }

  private bindDistrictData(data: any) {
    return <span>{data.District}</span>;
  }

  private bindHighlightData(data?: boolean) {
    return <div className="toggle-custom">
      <label className="toggle" data-on="Có" data-off="Ko">
        <input type="checkbox" id="checkbox-toggle"
               name="checkbox-toggle"
               checked={data || false}
               disabled={true}
        />
        <span className="button-checkbox"/>
      </label>
    </div>;
  }

  private bindStartDateData(data: any) {
    return <span>{data.StartDate ? TimeHelper.convertToDay(data.StartDate) : ""}</span>;
  }

  private bindEndDateData(data: any) {
    return <span>{data.EndDate ? TimeHelper.convertToDay(data.EndDate) : ""}</span>;
  }

  private bindRankingData(data: any) {
    return <span>{data.Rating || ''}</span>;
  }

  private importExcelHL() {
    if(this.btnImageFileInput) {
      this.btnImageFileInput.value = null;
      this.btnImageFileInput.click();
    }
  }

  private async handleFilePicked(e: any) {
    if (e.target.files && e.target.files) {
      let excelFile = e.target.files[0];
      if (excelFile) {
        //Validate file type and size
        if (excelFile.type != 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
          window['notice']('error-notice', 'Lỗi', 'Sai định dạng file Excel (.xlsx).', 'fa fa-exclamation-circle');
          return;
        }
        UIBlocker.instance.block();
        let uploadResult = await ImageServiceInstance.uploadExcelHL(excelFile);
        UIBlocker.instance.unblock();
        if (uploadResult) {
          this.setState({
            ImportData: uploadResult,
            ShowImportPreview: true,
          });
        } else {
          window['notice']('error-notice', 'Lỗi', 'Lỗi trong quá trình đọc dữ liệu từ file Excel.', 'fa fa-exclamation-circle');
        }
        return true;
      }
    }
  }

  private async handleImportData() {
    await this.getData(this.state.GridFilter);
  }

  private bindActionData(data: any) {
    return (<div className="table--actions-container">
      <button className="btn btn-danger" onClick={() => this.deletePlace(data.Id)}>
        <i className="fa fa-trash" aria-hidden="true">Xóa</i>
      </button>
    </div>);
  }
}


export default PlaceManagement;