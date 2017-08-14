import * as React from 'react'
import {Modal, Button, Form, FormGroup, Col, ControlLabel, FormControl, Checkbox} from 'react-bootstrap';
import {ImportPlaceGroupModel, ImportPlaceModel} from "../../../models/ImportPlaceModel";
import {LanguageEnums, Languages} from "../../../commons/constant";
import {ReactTable} from "../../../commons/react-table";
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table'
import {PlaceServiceInstance} from "../../services/PlaceService";
import * as moment from 'moment';

interface thisProps {
  ImportData?: ImportPlaceGroupModel[],
  IsShow?: boolean,
  onModalClosed?: () => void,
  onImportData?: () => void,
}

interface thisState {
  IsShow: boolean,
  CurrentLanguage?: LanguageEnums,
}

export class PlaceImportPreview extends React.Component<thisProps, thisState> {

  state: thisState = {
    IsShow: false,
    CurrentLanguage: LanguageEnums.English
  };

  componentWillMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.IsShow) {
      this.setState({IsShow: nextProps.IsShow});
    }
  }

  renderShowsTotal(start, to, total) {
    return (
      <p style={ { color: '#1a1a1a' } }>
        Hiển thị bảng ghi <b>{ start }</b> đến <b>{ to }</b> trên tổng số <b>{ total }</b>&nbsp;&nbsp;
      </p>
    );
  }

  renderImportPlaces(place: ImportPlaceModel[]) {
    const options = {
      page: 1,  // which page you want to show as default
      sizePerPageList: [ {
        text: '5', value: 5
      }, {
        text: '10', value: 10
      }, {
        text: '30', value: 30
      }, {
        text: '50', value: 50
      } ],
      sizePerPage: 10,  // which size per page you want to locate as default
      pageStartIndex: 1, // where to start counting the pages
      paginationSize: 5,  // the pagination bar size.
      prePage: 'Trước', // Previous page button text
      nextPage: 'Sau', // Next page button text
      firstPage: 'Đầu', // First page button text
      lastPage: 'Cuối', // Last page button text
      paginationPosition: 'bottom',  // default is bottom, top and both is all available
      // hideSizePerPage: true > You can hide the dropdown for sizePerPage
      alwaysShowAllBtns: true ,// Always show next and previous button
      withFirstAndLast: true,
      paginationShowsTotal: this.renderShowsTotal,
    };

    return (

      <BootstrapTable data={ place } pagination={ true } options={ options } height='500px'>
        <TableHeaderColumn width='60' dataFormat={(cell, row) => this.statusFormat(cell,row)} dataAlign="center">Status</TableHeaderColumn>
        <TableHeaderColumn dataField="PlaceName" isKey width='120'>Tên địa điểm</TableHeaderColumn>
        <TableHeaderColumn dataField="Category" dataFormat={(cell, row) => this.categoryFormat(cell,row)} width='120'>Thư mục</TableHeaderColumn>
        <TableHeaderColumn dataField="Service" dataFormat={(cell, row) => this.serviceFormat(cell,row)} width='120'>Dịch vụ</TableHeaderColumn>
        <TableHeaderColumn dataField="Description" tdStyle={{ whiteSpace: 'normal' }}
                           dataFormat={(cell, row) => this.descriptionFormat(cell,row)}
                           width='300'>Mô tả</TableHeaderColumn>
        <TableHeaderColumn dataField="CoverImage" tdStyle={ { padding: '3px' } }
                           dataFormat={(cell, row) => this.coverImgFormat(cell,row)}
                           width='80'>Ảnh đại diện</TableHeaderColumn>
        <TableHeaderColumn dataField="IsHomeSlider" dataFormat={(cell, row) => this.toggleBtFormat(cell,row)}
                           width='120'>
          HT Trang chủ
        </TableHeaderColumn>
        <TableHeaderColumn dataField="IsCategorySlider" dataFormat={(cell, row) => this.toggleBtFormat(cell,row)}
                           width='120'>
          HT Danh mục
        </TableHeaderColumn>
        <TableHeaderColumn dataFormat={(cell, row) => this.addressFormat(row)} width='250'>
          Địa chỉ
        </TableHeaderColumn>
        <TableHeaderColumn dataField="Phone" width='100'>
          Điện thoại
        </TableHeaderColumn>
        <TableHeaderColumn dataField="Fax" width='100'>
          Fax
        </TableHeaderColumn>
        <TableHeaderColumn dataField="OpenTime" dataFormat={(cell, row) => this.timeFormat(cell,row)} width='100'>
          Mở cửa
        </TableHeaderColumn>
        <TableHeaderColumn dataField="CloseTime" dataFormat={(cell, row) => this.timeFormat(cell,row)} width='100'>
          Đóng cửa
        </TableHeaderColumn>
        <TableHeaderColumn dataField="Website" dataFormat={(cell, row) => this.websiteFormat(cell,row)} width='250'>
          Website
        </TableHeaderColumn>
        <TableHeaderColumn dataFormat={(cell, row) => this.placeInfoFormat(cell,row)} width='300'>
          Thông tin thêm
        </TableHeaderColumn>
        <TableHeaderColumn dataFormat={(cell, row) => this.placeImagesFormat(cell,row)} width='300'>
          URL hình ảnh địa điểm
        </TableHeaderColumn>
      </BootstrapTable>
    )
  }

  render() {
    return (
      <Modal show={this.state.IsShow} onHide={() => this.hideModal()} bsSize="large"
             dialogClassName="custom-modal"
             aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title>{"Dữ liệu từ Excel"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-lg-12">
            <p>Lưu ý*: Những dữ liệu được <span style={{color:'red', fontWeight:'bold'}}>đánh dấu đỏ (<i className="fa fa-times-circle-o" />) </span>
              là bị sai, sẽ không được nhập vào CSDL.</p>
            <div className="col-lg-12 col-sm-12 form-horizontal">
              <div className="tabs mb20">
                <ul className="nav nav-tabs">
                  {this.props.ImportData.map((data, index) =>
                    <li key={index}
                        className={(this.state.CurrentLanguage || LanguageEnums.English) == data.Language ? 'active' : ''}>
                      <a onClick={() => {
                        this.setState({
                          CurrentLanguage: data.Language
                        })
                      }}>
                        {Languages.filter(r => r.Language == data.Language)[0].Title}
                      </a>
                    </li>
                  )}
                </ul>
                <div className="tab-content import-place">
                  {this.props.ImportData.filter(t => t.Language == this.state.CurrentLanguage).map((data, index) =>
                    <div key={index}>
                      {this.renderImportPlaces(data.ImportPlaces)}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => this.importData()}>Nhập dữ liệu</Button>
          <Button
            onClick={() => this.hideModal()}>Hủy</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  private hideModal() {
    this.setState({IsShow: false});
    this.props.onModalClosed && this.props.onModalClosed();
  }

  private async importData() {
    let result = await PlaceServiceInstance.SaveImportedPlace(this.props.ImportData);
    if (!result) {
      window['notice']('error-notice', 'Lỗi', 'Lỗi trong quá trình ghi dữ liệu từ file Excel vào CSDL.', 'fa fa-exclamation-circle');
    }
    this.hideModal();
    this.props.onImportData && this.props.onImportData();
  }

  private coverImgFormat(cell: any, row: any) {
    return (
      <div className={`image-upload-container single dn-image`}>
        <div className="image-upload-element" style={{width:'100%'}}>
          <div className={`image-preview${cell ? '' : ' empty-image'}`}
               style={cell ? {backgroundImage: 'url('+cell+')', height: 40} : {height: 40}}>
          </div>
        </div>
      </div>
    );
  }

  private descriptionFormat(cell: any, row: any) {
    return (
      <span className="cut-line-2" title={cell}>{cell}</span>);
  }

  private toggleBtFormat(cell: any, row: any) {
    return (
      <div className="toggle-custom">
        <label className="toggle" data-on="Có" data-off="Ko">
          <input type="checkbox" id="checkbox-toggle"
                 name="checkbox-toggle"
                 checked={cell || false}
                 disabled={true}
          />
          <span className="button-checkbox"/>
        </label>
      </div>
    );
  }

  private addressFormat(place: any) {
    return (
      <div>
        <span >{place.Address}</span>
        <span>, </span>
        <span className={place.DistrictNotExist ? 'text-red' : ''}>{place.District}</span>
        <span>, </span>
        <span className={place.CityNotExist ? 'text-red' : ''}>{place.City}</span>
      </div>
    );
  }

  private timeFormat(cell: any, row: any) {
    return (
      !moment(cell).isValid() ?
        <span></span> :
        <span>{moment(cell).format('HH:mm')}</span>
    )
  }

  private categoryFormat(cell: any, row: any) {
    return (
      <span className={row.CategoryNotExist ? 'text-red' : ''}>{cell}</span>
    );
  }

  private serviceFormat(cell: any, row: any) {
    return (
      <span className={row.ServiceNotExist ? 'text-red' : ''}>{cell}</span>
    );
  }

  private websiteFormat(cell: any, row: any) {
    return (
      <a className="cut-line-1" style={{width: 230, display: 'block'}} target="_blank"
         href={cell}>{cell}</a>
    )
  }

  private placeInfoFormat(cell: any, row: any) {
    return (
      row.AdditionalInfoError ?
        <span className="text-red">{"Thông tin thêm sai định dạng"}</span> :
        <div>
          {row.AdditionalInfo.map((info, id) =>
            <div key={id}>
              <span>{info.Key}: </span>
              <span>{info.Value}</span>
            </div>)}
        </div>
    )
  }

  private placeImagesFormat(cell: any, row: any) {
    return (
      row.PlaceImageError ?
        <span className="text-red">{"Hình ảnh địa điểm sai định dạng"}</span> :
        <div>
          {row.PlaceImages.map((img, id) =>
            <a key={id} className="cut-line-1" style={{width: 280, display: 'block'}}
               target="_blank"
               href={img}>{img}</a>)}
        </div>
    )
  }

  private statusFormat(cell: any, row: any) {
    let hasError = row.CategoryNotExist || row.ServiceNotExist || row.CityNotExist || row.DistrictNotExist
      || row.PlaceImageError;
    let statusIcon = hasError ? 'fa fa-times-circle-o' : 'fa fa-check-circle-o';
    return (<span style={hasError ? {color: 'red', fontSize: '26px'} : {color: 'green', fontSize: '26px'}}>
      <i className={statusIcon}  />
    </span>);
  }
}