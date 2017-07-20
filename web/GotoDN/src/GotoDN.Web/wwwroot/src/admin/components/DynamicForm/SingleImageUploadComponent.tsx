import * as React from 'react';
import {FieldValueModel} from "../../../models/field-value-model";
import {DynamicFieldModel} from "../../../models/dynamic-field-model";
import {ImageModel} from "../../../models/ImageModel";
import {ImageServiceInstance} from "../../services/image-service";

interface thisProps {
  FieldValue: FieldValueModel,
  Field: DynamicFieldModel,
  onImageChanged: (image: ImageModel) => void
}

interface thisStates {
  InValidFileType?: boolean,
  InValidFileSize?: boolean,
  InValidMessage?: string,
}

export class SingleImageUploadComponent extends React.Component<thisProps, thisStates> {
  state: thisStates = {
    InValidFileType: false,
    InValidFileSize: false,
    InValidMessage: ''
  };
  private btnImageFileInput: any;

  render() {
    let model: ImageModel = this.props.FieldValue.Value;
    let url = '';
    if (model && model.Url) {
      url = `url('${model.Url}')`;
    }
    let style = {backgroundImage: url};
    let isInvalid = this.props.FieldValue.ValidateResult && this.props.FieldValue.ValidateResult.IsInvalid;
    let cssClass = this.props.Field.FieldStructure.FieldData.CssClass;

    return (
      <div
        className={`form-group col-lg-12 p0${isInvalid || this.state.InValidFileSize || this.state.InValidFileType ? ' has-error' : ''}`}>
        <label
          className={`${this.props.Field.LabelClass ? this.props.Field.LabelClass : 'col-lg-2 col-md-3'} control-label`}>{this.props.Field.FieldStructure.Name}</label>
        <div className={`${this.props.Field.InputClass ? this.props.Field.InputClass : 'col-lg-10 col-md-9'}`}>
          <div className={`image-upload-container single ${cssClass}`}>
            <div className="image-upload-element">
              <div className={`image-preview${url ? '' : ' empty-image'}`} onClick={() => this.onImagePreviewClick()}
                   style={url ? style : null}>
                {url ?
                  <a className="remove-image" onClick={(e) => {
                      e.stopPropagation();
                      this.removeUploadedImage();
                    }}><i
                    className="fa fa-times"/></a> : null}
              </div>
              <input className="hidden" type="file" multiple={false} accept="image/*"
                     ref={(r) => this.btnImageFileInput = r}
                     onChange={(e) => this.btnImageFileInputOnChanged(e)}
              />
            </div>
          </div>
          {isInvalid ?
            <span className="help-block">{this.props.FieldValue.ValidateResult.InvalidMessage}</span> : null}
          {this.state.InValidFileSize || this.state.InValidFileType ?
            <span className="help-block">{this.state.InValidMessage}</span> : null}
        </div>
      </div>
    );
  }

  private onImagePreviewClick() {
    this.btnImageFileInput && this.btnImageFileInput.click();
  }

  private removeUploadedImage() {
    this.props.onImageChanged(null);
  }

  _URL = window.URL;

  private async btnImageFileInputOnChanged(v: any) {
    if (v.target.files && v.target.files) {
      let image = v.target.files[0];
      if (image) {
        //Validate file type and size
        let isIcon = this.props.Field.FieldStructure.FieldData.Type ? this.props.Field.FieldStructure.FieldData.Type == 'Icon' : null;
        if (isIcon != null) {
          let img = new Image();
          img.onload = async () =>  {
            if (image.size > (isIcon ? ICON_SIZE : IMAGE_SIZE)) {
              this.setState({
                InValidFileSize: true,
                InValidMessage: 'Dung lượng ' + (isIcon ? 'Icon' : 'Hình ảnh') +' không được vượt quá ' + (isIcon ? ICON_SIZE : IMAGE_SIZE)/(1024*1024) + 'MB'
              });
              return;
            }
            this.setState({
              InValidFileType: false,
              InValidFileSize: false,
              InValidMessage: ''
            });

            let uploadResult = await ImageServiceInstance.uploadNewImage(image);
            if (uploadResult) {
              this.props.onImageChanged(uploadResult);
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
        else {
          let uploadResult = await ImageServiceInstance.uploadNewImage(image);
          if (uploadResult) {
            this.props.onImageChanged(uploadResult);
          }
        }
      }
    }
  }
}