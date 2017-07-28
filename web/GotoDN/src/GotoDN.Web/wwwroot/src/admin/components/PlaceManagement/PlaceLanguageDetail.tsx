import * as React from 'react';
import {PlaceLanguageModel} from "../../../models/PlaceLanguageModel";
import {DynamicPanelComponent} from "../DynamicForm/DynamicPanelComponent";
import {DynamicFormModel} from "../../../models/dynamic-form-model";
import {DynamicFieldModel} from "../../../models/dynamic-field-model";
import {FieldStructureTypeEnums} from "../../../models/field-structure-model";
import {ValidateRuleTypeEnums, LanguageEnums} from "../../../commons/constant";
import {MessageBox, MessageBoxType, MessageBoxButtons, MessageBoxResult} from "../../../commons/message-box";
import {HTServiceModel} from "../../../models/HTServiceModel";
import {PlaceServiceInstance} from "../../services/PlaceService";
import {PlaceModel} from "../../../models/PlaceModel";
interface thisProps {
  PlaceLanguage: PlaceLanguageModel,
  EnPlaceLanguage: PlaceLanguageModel,
  IsSelected: boolean,
  OnObjectChange: (obj: PlaceLanguageModel) => void
}

interface thisState {
  EditingObjec1t?: PlaceLanguageModel
}

class PlaceLanguageDetail extends React.Component<thisProps, thisState> {
  editingForm: DynamicPanelComponent;
  state: thisState = {};

  setState(state: thisState) {
    super.setState(state);
  }

  render() {
    return (
      <div className={`tab-pane fade${this.props.IsSelected ? ' active in' : ''}`}>
        {this.props.PlaceLanguage ?
          <DynamicPanelComponent
            ref={(r) => this.editingForm = r}
            FormStructure={this.getFormStructure()}
            onFieldValueChange={(obj) => {
              this.props.OnObjectChange(obj)
            }}
            Object={this.props.PlaceLanguage}
            onValidationChange={(isInvalid) => {
              this.props.PlaceLanguage['__#isInvalid#__'] = isInvalid
            }}
          /> : null}
        {this.props.PlaceLanguage && this.props.PlaceLanguage.Language != LanguageEnums.English ?
          <div className="form-group">
            <div className="col-lg-9 col-lg-offset-3 p0">
              <button className="btn btn-warning"
                      onClick={() => this.translateCategory()}>Dịch từ Tiếng Anh
              </button>
            </div>
          </div>: null
        }
      </div>);
  }

  private getFormStructure(): DynamicFormModel[] {
    let allForms: DynamicFormModel[] = [];
    {
      let inforForm: DynamicFormModel = {
        Icon: 'fa fa-info',
        Priority: 1,
        Title: '',
        BlankPanel: true,
        DynamicFields: []
      };
      let f_Title: DynamicFieldModel = {
        Priority: 1,
        LabelClass: 'col-lg-3',
        InputClass: 'col-lg-9',
        FieldStructure: {
          Name: 'Tiêu đề',
          FieldName: 'Title',
          PlaceHolder: '',
          Type: FieldStructureTypeEnums.TextBox,
          ValidateRules: [{
            Type: ValidateRuleTypeEnums.Required,
            InValidMessage: 'Trường này là bắt buộc'
          },
            {
              Type: ValidateRuleTypeEnums.MinLength,
              InValidMessage: 'Yêu cầu ít nhất 3 ký tự',
              RuleData: '3'
            },
            {
              Type: ValidateRuleTypeEnums.MaxLength,
              InValidMessage: 'Không được vượt quá 50 ký tự',
              RuleData: '50'
            }
          ]
        }
      };

      let f_Description: DynamicFieldModel = {
        Priority: 2,
        LabelClass: 'col-lg-3',
        InputClass: 'col-lg-9',
        FieldStructure: {
          Name: 'Mô tả',
          FieldName: 'Description',
          PlaceHolder: '',
          Type: FieldStructureTypeEnums.TextArea,
          ValidateRules: []
        }
      };

      let f_Image: DynamicFieldModel = {
        Priority: 3,
        LabelClass: 'col-lg-3',
        InputClass: 'col-lg-9',
        FieldStructure: {
          Name: 'Ảnh đại diện',
          FieldName: 'Image',
          PlaceHolder: '',
          FieldData: {
            CssClass: 'dn-image-place',
            Type: 'Image',
          },
          Type: FieldStructureTypeEnums.SingleImage,
          ValidateRules: []
        }
      };

      let f_MultiImage: DynamicFieldModel = {
        Priority: 4,
        LabelClass: 'col-lg-3',
        InputClass: 'col-lg-9',
        FieldStructure: {
          Name: 'Ảnh địa điểm',
          FieldName: 'PlaceImages',
          PlaceHolder: '',
          FieldData: {
            CssClass: 'dn-m-image-place',
            Type: 'Image',
          },
          Type: FieldStructureTypeEnums.C_ImagesUpload,
          ValidateRules: []
        }
      };

      let f_Icon: DynamicFieldModel = {
        Priority: 4,
        LabelClass: 'col-lg-3',
        InputClass: 'col-lg-9',
        FieldStructure: {
          Name: 'Icon',
          FieldName: 'Icon',
          PlaceHolder: '',
          FieldData: {},
          Type: FieldStructureTypeEnums.SingleImage,
          ValidateRules: []
        }
      };
      inforForm.DynamicFields.push(f_Title);
      inforForm.DynamicFields.push(f_Description);
      inforForm.DynamicFields.push(f_Image);
      inforForm.DynamicFields.push(f_MultiImage);
      allForms.push(inforForm);
    }
    return allForms;
  }

  private savePlace() {
    if (this.editingForm.isFormValid()) {

    }
    this.forceUpdate();
  }

  private async translateCategory() {
    let dialogResult = await MessageBox.instance.show({
      content: 'Dịch từ Tiếng anh sẽ ghi đè dữ liệu lên ngôn ngữ hiện tại. Bạn có chắc là bạn muốn dịch?',
      isShow: true,
      title: 'Xác nhận',
      type: MessageBoxType.Confirmation,
      buttons: MessageBoxButtons.YesNo
    });

    if (dialogResult == MessageBoxResult.Yes) {
      let placeModel: PlaceModel = {Id: 0, PlaceLanguages: []};

      placeModel.PlaceLanguages.push(this.props.PlaceLanguage, this.props.EnPlaceLanguage);
      let translatedServiceLang = await PlaceServiceInstance.TranslatePlaceLanguage(placeModel);
      if(translatedServiceLang != null && this.props.OnObjectChange) {
        this.props.OnObjectChange(translatedServiceLang);
      }
    }
  }
}

export default PlaceLanguageDetail;