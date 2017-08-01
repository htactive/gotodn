import * as React from 'react';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import {UploadImageModel} from '../../../models/UploadImageModel';
import {ImageServiceInstance} from "../../services/image-service";
import {ImageSetValueModel} from "../../../models/field-value-model";
import {DynamicFieldModel} from "../../../models/dynamic-field-model";
import {IMAGE_SIZE, ICON_SIZE, Helper} from "../../../commons/constant";
import {PlaceImageModel, PlaceMoreInfoModel} from "../../../models/PlaceLanguageModel";
import * as Lightbox from 'react-image-lightbox';
import {ImageModel} from "../../../models/ImageModel";
interface thisState {
  MoreInfo?: PlaceMoreInfoModel[]
  InValidFileType?: boolean,
  InValidFileSize?: boolean,
  InValidMessage?: string,
}

interface thisProps {
  Field: DynamicFieldModel,
  Info: PlaceMoreInfoModel[],
  onInfoChanged: (info: PlaceMoreInfoModel[]) => void
}

export class MoreInfoComponent extends React.Component<thisProps, thisState> {
  state: thisState = {
    MoreInfo: [],
    InValidFileType: false,
    InValidFileSize: false,
    InValidMessage: '',
  };

  componentWillMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(props: thisProps) {
    let info: PlaceMoreInfoModel[] = [];
    if (props.Info) {
      info = info.concat(props.Info);
      // info = info.sort((a, b) => {
      //   if (a.Name < b.Name)
      //     return -1;
      //   if (a.Name > b.Name)
      //     return 1;
      //   return 0;
      // });
    }

    this.setState({
      MoreInfo: info
    });
  }

  render() {

    return (
      <div
        className={`form-group col-lg-12 p0`}>
        <label
          className={`${this.props.Field.LabelClass ? this.props.Field.LabelClass : 'col-lg-2 col-md-3'} control-label`}>{this.props.Field.FieldStructure.Name}</label>
        <div className={`${this.props.Field.InputClass ? this.props.Field.InputClass : 'col-lg-10 col-md-9'}`}>
          {this.state.MoreInfo && this.state.MoreInfo.map((i, index) =>
            <div key={index}>
              <div className="col-lg-3 p0">
                <input type="text" className="form-control"
                       value={i.Name || ''} placeholder="Tiêu đề" maxLength={50}
                       onChange={(e) => this.titleChange(e, i,index, false)}
                       onBlur={(e) => this.titleChange(e, i,index, true)}
                />
              </div>
              <div className="col-lg-3 p0 pl10">
                <input type="text" className="form-control"
                       value={i.Value || ''} placeholder="Nội dung" maxLength={150}
                       onChange={(e) => this.descriptionChange(e, i, index, false)}
                       onBlur={(e) => this.descriptionChange(e, i,index, true)}
                />
              </div>
              <div className="col-lg-2 p0 pl10 text-center">
                <div style={{float: 'left', padding: '8px 10px 0 0'}}>Icon:</div>
                <div className={`image-upload-container single ${'dn-icon-info'}`}>
                  <div className="image-upload-element">
                    <div className={`image-preview${i.Icon && i.Icon.Url ? '' : ' empty-image'}`}
                         onClick={() => this.onImagePreviewClick(i, index)}
                         style={i.Icon && i.Icon.Url ? {backgroundImage: 'url(' + i.Icon.Url + ')'} : null}
                    >
                      {i.Icon && i.Icon.Url ?
                        <a className="remove-image" onClick={(e) => {
                          e.stopPropagation();
                          this.removeUploadedImage(i, index);
                        }}>
                          <i className="fa fa-times"/>
                        </a> : null}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3 p0 text-center">
                <div style={{float: 'left', padding: '8px 10px 0 0'}}>Kích thước:</div>
                <div className="toggle-custom">
                  <label className="toggle" data-on="Half" data-off="Full">
                    <input type="checkbox" id="checkbox-toggle"
                           name="checkbox-toggle"
                           checked={i.IsHalf || false}
                           onChange={(e) => {this.changeSize(e,i,index)}}
                    />
                    <span className="button-checkbox"/>
                  </label>
                </div>
              </div>
              <div className="col-lg-1 p0 text-center">
                <button onClick={() => this.deleteInfo(index)} className="btn btn-danger">Xóa</button>
              </div>
            </div>
          )}
          {this.state.InValidFileSize || this.state.InValidFileType ?
            <span className="help-block">{this.state.InValidMessage}</span> : null}
          <button disabled={this.state.MoreInfo && this.state.MoreInfo.length == 10} className="btn btn-default"
                  onClick={() => this.addMoreInfo()}>Thêm mới
          </button>
        </div>
        <input className="hidden" type="file" multiple={true} accept="image/*" ref={(r) => this.btnImageFileInput = r}
               onChange={(e) => this.btnImageFileInputOnChanged(e)}/>
      </div>);
  }

  btnImageFileInput: any;
  currentData?: PlaceMoreInfoModel;
  currentIndex?: number;

  private onImagePreviewClick(data: PlaceMoreInfoModel, index: number) {
    this.currentData = data;
    this.currentIndex = index;
    this.btnImageFileInput.value = null;
    this.btnImageFileInput.click();
  }

  _URL = window.URL;

  private async btnImageFileInputOnChanged(v: any) {
    if (v.target.files && v.target.files) {
      let image = v.target.files[0];
      if (image) {
        //Validate file type and size
        let img = new Image();
        img.onload = async() => {
          if (image.size > ICON_SIZE) {
            this.setState({
              InValidFileSize: true,
              InValidMessage: 'Dung lượng Icon không được vượt quá ' + ICON_SIZE / (1024 * 1024) + 'MB'
            });
            return;
          }
          this.setState({
            InValidFileType: false,
            InValidFileSize: false,
            InValidMessage: ''
          });

          let uploadResult: ImageModel = {Id: 0};
          uploadResult = await ImageServiceInstance.uploadNewIcon(image);
          if (uploadResult && this.currentData) {
            let data = Helper.CloneObject(this.currentData);
            data.Icon = uploadResult;
            this.changeInfo(data);
            this.currentData = null;
          }
        };
        img.onerror = () => {
          this.setState({
            InValidFileType: true,
            InValidMessage: 'Sai định dạng'
          });
        };
        img.src = this._URL.createObjectURL(image);
      }
    }
  }

  private removeUploadedImage(data: PlaceMoreInfoModel, index: number) {
    this.currentIndex = index;
    data.Icon = null;
    this.changeInfo(data);
  }

  private titleChange(e: any, data: PlaceMoreInfoModel, index: number, isUpdate: boolean) {
    this.currentIndex = index;

    if (isUpdate) {
      data.Name = e.target.value;
      this.changeInfo(data);
    }
    else {
      let info = this.state.MoreInfo.slice();
      if (this.currentIndex >= 0) {
        info[this.currentIndex].Name = e.target.value;
        this.setState({MoreInfo: info});
      }
    }
  }

  private descriptionChange(e: any, data: PlaceMoreInfoModel, index: number, isUpdate: boolean) {
    this.currentIndex = index;

    if (isUpdate) {
      data.Value = e.target.value;
      this.changeInfo(data);
    }
    else {
      let info = this.state.MoreInfo.slice();
      if (this.currentIndex >= 0) {
        info[this.currentIndex].Value = e.target.value;
        this.setState({MoreInfo: info});
      }
    }
  }

  private changeSize(e: any, data: PlaceMoreInfoModel, index: number) {
    this.currentIndex = index;
    data.IsHalf = e.target.checked;
    this.changeInfo(data);
  }

  private changeInfo(data: PlaceMoreInfoModel) {
    let info = this.state.MoreInfo.slice();
    if (this.currentIndex >= 0) {
      info[this.currentIndex] = data;
      this.props.onInfoChanged && this.props.onInfoChanged(info);
    }
  }

  private addMoreInfo() {
    let info = this.state.MoreInfo.slice();
    if (info.length < 10) {
      info.push({
        Id: 0
      });
      this.props.onInfoChanged && this.props.onInfoChanged(info);
    }
  }

  private deleteInfo(index: number) {
    let info = this.state.MoreInfo.slice();
    if (info.length > 0) {
      info.splice(index, 1);
      this.props.onInfoChanged && this.props.onInfoChanged(info);
    }
  }

}
