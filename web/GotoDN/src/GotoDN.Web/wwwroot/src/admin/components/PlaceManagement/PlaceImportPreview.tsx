import * as React from 'react'
import {Modal, Button, Form, FormGroup, Col, ControlLabel, FormControl, Checkbox} from 'react-bootstrap';
import {ImportPlaceGroupModel} from "../../../models/ImportPlaceModel";
import {LanguageEnums, Languages} from "../../../commons/constant";
import {ReactTable} from "../../../commons/react-table";

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

  render() {
    return (
      <Modal show={this.state.IsShow} onHide={() => this.hideModal()} bsSize="large"
             aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title>{"Dữ liệu từ Excel"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-lg-12">
            <p>Lưu ý*: Những dữ liệu được <span style={{color:'red'}}>bôi đỏ</span> là bị sai, sẽ không được nhập vào CSDL.</p>
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
                <div className="tab-content">
                  {this.props.ImportData.filter(t => t.Language == this.state.CurrentLanguage).map((data, index) =>
                    <div key={index} className="overflow-x">
                      <table className="preview-table table table-hover table-bordered" cellSpacing={0} role="grid"
                             style={{width: 1010}}
                      >
                        <thead>
                        <tr role="row">
                          <th style={{width: 120}}>
                            Tên địa điểm
                          </th>
                          <th style={{width: 120}}>
                            Thư mục
                          </th>
                          <th style={{width: 120}}>
                            Dịch vụ
                          </th>
                          <th style={{width: 300}}>
                            Mô tả
                          </th>
                          <th style={{width: 120}}>
                            Ảnh đại diện
                          </th>
                          <th style={{width: 100}}>
                            HT Trang chủ
                          </th>
                          <th style={{width: 100}}>
                            HT Danh mục
                          </th>
                          <th style={{width: 200}}>
                            Địa chỉ
                          </th>
                          <th style={{width: 100}}>
                            Điện thoại
                          </th>
                          <th style={{width: 100}}>
                            Fax
                          </th>
                          <th style={{width: 100}}>
                            Mở cửa
                          </th>
                          <th style={{width: 100}}>
                            Đóng cửa
                          </th>
                          <th style={{width: 120}}>
                            Website
                          </th>
                          <th style={{width: 220}}>
                            Thông tin thêm
                          </th>
                        </tr>
                        </thead>
                        <tbody>
                        {data.ImportPlaces && data.ImportPlaces.map((place, pId) =>
                          <tr key={pId} role="row">
                            <td>{place.PlaceName}</td>
                            <td><span className={place.CategoryNotExist ? 'text-red' : ''}>{place.Category}</span></td>
                            <td><span className={place.ServiceNotExist ? 'text-red' : ''}>{place.Service}</span></td>
                            <td><span className="cut-line-3">{place.Description}</span></td>
                            <td>
                              <div className={`image-upload-container single dn-image`}>
                                <div className="image-upload-element" style={{width:'100%'}}>
                                  <div className={`image-preview${place.CoverImage ? '' : ' empty-image'}`}
                                       style={place.CoverImage ? {backgroundImage: 'url('+place.CoverImage+')', height: 90} : {height: 90}}>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td>
                              <div className="toggle-custom">
                                <label className="toggle" data-on="Có" data-off="Ko">
                                  <input type="checkbox" id="checkbox-toggle"
                                         name="checkbox-toggle"
                                         checked={place.IsHomeSlider || false}
                                         disabled={true}
                                  />
                                  <span className="button-checkbox"/>
                                </label>
                              </div>
                            </td>
                            <td>
                              <div className="toggle-custom">
                                <label className="toggle" data-on="Có" data-off="Ko">
                                  <input type="checkbox" id="checkbox-toggle"
                                         name="checkbox-toggle"
                                         checked={place.IsCategorySlider || false}
                                         disabled={true}
                                  />
                                  <span className="button-checkbox"/>
                                </label>
                              </div>
                            </td>
                            <td>
                              <span >{place.Address}</span>
                              <span>, </span>
                              <span className={place.DistrictNotExist ? 'text-red' : ''}>{place.District}</span>
                              <span>, </span>
                              <span className={place.CityNotExist ? 'text-red' : ''}>{place.City}</span>
                            </td>
                            <td>{place.Phone}</td>
                            <td>{place.Fax}</td>
                            <td>{place.OpenTime}</td>
                            <td>{place.CloseTime}</td>
                            <td><a className="cut-line-1" style={{width: 110, display: 'block'}} target="_blank"
                                   href={place.Website}>{place.Website}</a></td>
                            <td>{place.AdditionalInfoError ?
                              <span className="text-red">{"Thông tin thêm sai định dạng"}</span> :
                              <div>
                                {place.AdditionalInfo.map((ad, id) => <span key={id}>
                                  {ad.Key}:&nbsp;{ad.Value} <br />
                                </span>)}
                              </div>}
                            </td>
                          </tr>
                        )}
                        </tbody>
                      </table>
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
  }

  private importData() {

  }
}