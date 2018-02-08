import * as React from 'react';
import {SortableContainer, SortableElement, arrayMove} from 'react-sortable-hoc';
import {UploadImageModel} from '../../../models/UploadImageModel';
import {ImageServiceInstance} from "../../services/image-service";
import {ImageSetValueModel} from "../../../models/field-value-model";
import {DynamicFieldModel} from "../../../models/dynamic-field-model";
import {IMAGE_SIZE} from "../../../commons/constant";
import {PlaceImageModel} from "../../../models/PlaceLanguageModel";
import * as Lightbox from 'react-image-lightbox';
interface thisState {
  upload_images: UploadImageModel[],
  InValidFileType?: boolean,
  InValidFileSize?: boolean,
  InValidMessage?: string,
  ImagePreviewOpen?: boolean,
  ImagePreviewIndex?: number,
  IsShowMore?: boolean,
}

interface thisProps {
  Field: DynamicFieldModel,
  ImageSetValue: PlaceImageModel[],
  onImageSetChanged: (irv: PlaceImageModel[]) => void
}

export class MultiImageUploadComponent extends React.Component<thisProps, thisState> {
  state: thisState = {
    upload_images:[],
    ImagePreviewIndex: 0,
    InValidFileType: false,
    InValidFileSize: false,
    InValidMessage: '',
    ImagePreviewOpen: false,
    IsShowMore: false,
  };

  componentWillMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(props: thisProps) {
    if(props.ImageSetValue)
      props.ImageSetValue.sort((a, b) =>b.Order - a.Order)
    let images: UploadImageModel[] = [
      {
        Id: 0
      }, {
        Id: 0
      }, {
        Id: 0
      }, {
        Id: 0
      }, {
        Id: 0
      }, {
        Id: 0
      }, {
        Id: 0
      }, {
        Id: 0
      }, {
        Id: 0
      }, {
        Id: 0
      }, {
        Id: 0
      }, {
        Id: 0
      }, {
        Id: 0
      }, {
        Id: 0
      }, {
        Id: 0
      }, {
        Id: 0
      }, {
        Id: 0
      }, {
        Id: 0
      }, {
        Id: 0
      }, {
        Id: 0
      }, {
        Id: 0
      }, {
        Id: 0
      }, {
        Id: 0
      }, {
        Id: 0
      }, {
        Id: 0
      }, {
        Id: 0
      }, {
        Id: 0
      }, {
        Id: 0
      }, {
        Id: 0
      }, {
        Id: 0
      },];
    for (let i = 0; i < (props.ImageSetValue.length < 30 ? props.ImageSetValue.length : 30); i++) {
      images[i].Url = props.ImageSetValue[i].Image ? props.ImageSetValue[i].Image.Url : '';
      images[i].Id = props.ImageSetValue[i].ImageId;
    }

    this.setState({
      upload_images: images
    });
  }

  onSortEnd = ({oldIndex, newIndex}) => {
    let irv = this.props.ImageSetValue;
    irv = arrayMove(irv, oldIndex, newIndex);
    this.props.onImageSetChanged(irv);
  };

  render() {

    const SortableItem = ({value}) => {
      let url = '';
      if (value.Url) {
        url = `url('${value.Url}')`;
      }
      let style = {backgroundImage: url};

      let cssClass = this.props.Field.FieldStructure.FieldData.CssClass;
      return (
        <div className="image-upload-element">
          <div className={`image-preview${url ? '' : ' empty-image'}`} onClick={() => this.onImagePreviewClick(value)}
               style={url ? style : null}>
            {url ?
              <a className="remove-image" onClick={(e) => {
                e.stopPropagation();
                this.removeUploadedImage(value);
              }}><i
                className="fa fa-times"/></a> : null}
          </div>
        </div>);
    };

    const SortableList = (items: any) => {
      return (
        <div className="image-upload-container" style={this.state.IsShowMore ? {height: '680px', overflow: 'hidden'} : {height: '230px', overflow: 'hidden'}}>
          {items.items.map((value, index) => (
            <SortableItem key={`item-${index}`} value={value} />
          ))}
          <div className={'image-upload-bottom'}>
            <button className={'btn btn-link'} style={{paddingTop: 3}} onClick={() => this.setState({IsShowMore: !this.state.IsShowMore})} >
              {this.state.IsShowMore ? 'Thu gọn' : 'Xem thêm'}
            </button>
          </div>
        </div>
      );
    };

    let isOpen = this.state.ImagePreviewOpen;
    let imagesPreview = this.state.upload_images.filter(i => i.Url && i.Url != '').map(i => { return i.Url});

    return (
      <div
        className={`form-group col-lg-12 p0${this.state.InValidFileSize || this.state.InValidFileType ? ' has-error' : ''}`}>
        <label
          className={`${this.props.Field.LabelClass ? this.props.Field.LabelClass : 'col-lg-2 col-md-3'} control-label`}>{this.props.Field.FieldStructure.Name}</label>
        <div className={`${this.props.Field.InputClass ? this.props.Field.InputClass : 'col-lg-10 col-md-9'}`}>
          <SortableList items={this.state.upload_images} onSortEnd={this.onSortEnd} axis={'xy'} distance={3}/>
          {this.state.InValidFileSize || this.state.InValidFileType ?
            <span className="help-block">{this.state.InValidMessage}</span> : null}
        </div>
        <input className="hidden" type="file" multiple={true} accept="image/*" ref={(r) => this.btnImageFileInput = r}
               onChange={(e) => this.btnImageFileInputOnChanged(e)} />
        {isOpen &&
        <Lightbox
          mainSrc={imagesPreview[this.state.ImagePreviewIndex]}
          nextSrc={imagesPreview[(this.state.ImagePreviewIndex + 1) % imagesPreview.length]}
          prevSrc={imagesPreview[(this.state.ImagePreviewIndex + imagesPreview.length - 1) % imagesPreview.length]}

          onCloseRequest={() => this.setState({ ImagePreviewOpen: false })}
          onMovePrevRequest={() => this.setState({
                            ImagePreviewIndex: (this.state.ImagePreviewIndex + imagesPreview.length - 1) % imagesPreview.length,
                        })}
          onMoveNextRequest={() => this.setState({
                            ImagePreviewIndex: (this.state.ImagePreviewIndex + 1) % imagesPreview.length,
                        })}
        />
        }
      </div>);
  }

  btnImageFileInput: any;
  clickedImageId: number;

  private onImagePreviewClick(value: UploadImageModel) {
    if(value.Url && value.Url != '') {
      let imagesPreview = this.state.upload_images.filter(i => i.Url && i.Url != '').map(i => { return i.Url});
      this.setState({ImagePreviewOpen: true, ImagePreviewIndex: imagesPreview.indexOf(value.Url)});
    }
    else {
      this.setState({ImagePreviewOpen: false});
      this.clickedImageId = value.Id;
      this.btnImageFileInput.value = null;
      this.btnImageFileInput.click();
    }
  }

  _URL = window.URL;

  private async btnImageFileInputOnChanged(v: any) {
    if (v.target.files && v.target.files) {
      let images = v.target.files;
      if (images) {
        let validImgs = true;
        let imageNum = this.state.upload_images.filter(i => i.Url && i.Url != '').length;
        if(imageNum + images.length > 30) {
          this.setState({
            InValidFileType: true,
            InValidMessage: 'Chỉ được upload tối đa 30 hình ảnh.'
          });
          validImgs = false;
          return;
        }
        this.setState({
          InValidFileType: false,
          InValidFileSize: false,
          InValidMessage: ''
        });
        for (let i = 0; i < images.length; i++) {
          let image = images[i];
          let img = new Image();
          img.onload = () =>  {
            if (image.size > IMAGE_SIZE) {
              this.setState({
                InValidFileSize: true,
                InValidMessage: 'Dung lượng Hình ảnh không được vượt quá ' + (IMAGE_SIZE)/(1024*1024) + 'MB'
              });
              validImgs = false;
              return;
            }
            this.setState({
              InValidFileType: false,
              InValidFileSize: false,
              InValidMessage: ''
            });
          };
          img.onerror = () => {
            this.setState({
              InValidFileType: true,
              InValidMessage: 'Sai định dạng'
            });
            validImgs = false;
          };
          img.src = this._URL.createObjectURL(image);
        }
        if(validImgs) {
          let uploadResult = await ImageServiceInstance.uploadMultiImage(images);
          if (uploadResult) {
            let irv = this.props.ImageSetValue;
            irv = irv.concat(uploadResult.map(t => {
              let placeImg: PlaceImageModel = {Id:0, ImageId: t.Id, Image: t};
              return placeImg;
            } ));
            this.props.onImageSetChanged(irv);
          }
        }
      }
    }
  }

  private removeUploadedImage(value: UploadImageModel) {
    let irv = this.props.ImageSetValue;
    irv = irv.filter(x => x.ImageId != value.Id);
    this.props.onImageSetChanged(irv);
  }
}
