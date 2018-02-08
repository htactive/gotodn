import * as React from 'react';
import {CityServiceInstance} from "../../services/CityService";
import {CityModel} from "../../../models/CityModel";
import {GetGridRequestModel, GetGridResponseModel, ReactTable} from "../../../commons/react-table";
import {TableHeaderColumn} from 'react-bootstrap-table';
import CityModal from "../../components/CityManagement/CityModal";
import {SweetAlertResultEnums, SweetAlerts, SweetAlertTypeEnums} from "../../../commons/sweet-alerts";

interface thisState {
  GridFilter?: GetGridRequestModel,
  GridData?: GetGridResponseModel,
  SelectedCity?: CityModel,
}
class CityManagement extends React.Component<{}, thisState> {
  cityModal: CityModal;
  state: thisState = {
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
    this.getData(this.state.GridFilter);
  }

  private async getData(request: GetGridRequestModel) {
    let result = await CityServiceInstance.Filter(request);
    if (result) {
      this.setState({GridData: result});
    }
  }

  private async createCity() {
    this.setState({SelectedCity: {Id: 0, Name: '',}});
    this.cityModal.show();
    // let result = await CityServiceInstance.CreateCity();
    // if (result) {
    //   window['notice_create_success']();
    //   let filter = this.state.GridFilter;
    //   if (filter) {
    //     filter.CurrentPage = 1;
    //     filter.IsAsc = false;
    //     filter.SortExpression = "Id";
    //   }
    //   this.getData(filter);
    //   this.setState({
    //     SelectedCity: result,
    //   })
    // }
    // else {
    //   window['notice_error']();
    // }
  }

  private async updateCity(model: CityModel) {
    let result = await CityServiceInstance.UpdateCity(model);
    if (result) {
      window['notice_save_success']();
      this.getData(this.state.GridFilter);
    }
    else {
      window['notice_error']();
    }
  }

  private async deleteCity(Id: number) {
    if (await SweetAlerts.show({
        type: SweetAlertTypeEnums.Warning,
        title: 'Xác nhận xóa',
        text: 'Bạn có chắc muốn xóa tỉnh thành này?',
        showCancelButton: true,
        confirmButtonText: 'Đồng ý xóa',
        closeOnConfirm: true
      }) == SweetAlertResultEnums.Confirm) {
      let result = await CityServiceInstance.DeleteCity(Id);
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
          SelectedCity: null,
        });
      }
      else {
        window['notice']('error-notice', 'Lỗi', 'Không thể xóa được bản ghi vì bản ghi được sử dụng trong hệ thống, bạn chỉ có thể xóa được bản ghi nếu nó không được sử dụng trong hệ thống.', 'glyphicon glyphicon-remove');
      }
    }
  }

  render() {
    return (
      <div className="page-content-wrapper">
        <div className={`page-content-inner`}>
          <div id="page-header" className="clearfix">
            <div className="page-header">
              <h2>Tỉnh thành</h2>
              <span className="txt">Quản lý tỉnh thành</span>
            </div>
            <div className="header-stats">
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="panel panel-default plain toggle panelMove  ">
                <div className="panel-body">

                  <form className="form-inline">

                        <span className="input-group-btn">
                            <button className="btn btn-primary" type="button"
                                    onClick={() => this.createCity()}
                            ><i className="fa fa-plus"></i> Thêm tỉnh thành</button>
                          </span>
                  </form>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12">
              <div className="panel panel-default plain toggle panelMove">
                <div className="panel-body">
                  <ReactTable request={this.state.GridFilter}
                              data={this.state.GridData}
                              trClassName={(d) => {
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
                                       dataFormat={(r, data) => this.bindCityData(data)} dataSort={ true }>
                      Tên tỉnh thành</TableHeaderColumn>
                    <TableHeaderColumn width="200" dataField="District" dataAlign="center"
                                       dataFormat={(r, data) => this.bindDistrictData(data)} dataSort={ false }>
                      Quận huyện trực thuộc</TableHeaderColumn>
                    <TableHeaderColumn width="80" dataField="Action" dataAlign="center"
                                       dataFormat={(r, data) => this.bindActionData(data)} dataSort={ false }>
                      Thao tác</TableHeaderColumn>
                  </ReactTable>

                </div>
              </div>
            </div>
          </div>
        </div>
        <CityModal ref={e => this.cityModal = e}
                   SelectedCity={this.state.SelectedCity}
                   SaveCity={(model) => this.updateCity(model)}
                   OnChange={(model) => this.setState({SelectedCity: model})}
                   deleteCity={(Id: number) => this.deleteCity(Id)}
        />
      </div>
    );
  }

  private bindCityData(data: CityModel) {
    return <a onClick={() => {
      this.setState({SelectedCity: data});
      this.cityModal.show();
    }}>{data.Name || 'Chưa đặt tên'}</a>;
  }

  private bindDistrictData(data: CityModel) {
    let districts = data && data.Districts && data.Districts.map(x => x.Name);
    return <span>{districts.toString()}</span>;
  }

  private bindActionData(data: any) {
    return (<div className="table--actions-container">
      <button className="btn btn-danger" onClick={() => this.deleteCity(data.Id)}>
        <i className="fa fa-trash" aria-hidden="true">Xóa</i>
      </button>
    </div>);
  }
}


export default CityManagement;