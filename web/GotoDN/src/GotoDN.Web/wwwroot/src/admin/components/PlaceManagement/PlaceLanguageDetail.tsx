import * as React from 'react';
import {PlaceLanguageModel} from "../../../models/PlaceLanguageModel";
import {DynamicPanelComponent} from "../DynamicForm/DynamicPanelComponent";
import {DynamicFormModel} from "../../../models/dynamic-form-model";
import {DynamicFieldModel} from "../../../models/dynamic-field-model";
import {FieldStructureTypeEnums} from "../../../models/field-structure-model";
import {ValidateRuleTypeEnums} from "../../../commons/constant";
interface thisProps {
  PlaceLanguage: PlaceLanguageModel,
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
          Name: 'Image',
          FieldName: 'Image',
          PlaceHolder: '',
          FieldData: {},
          Type: FieldStructureTypeEnums.SingleImage,
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
      inforForm.DynamicFields.push(f_Icon);
      allForms.push(inforForm);
    }
    return allForms;
  }

  private savePlace() {
    if (this.editingForm.isFormValid()) {

    }
    this.forceUpdate();
  }
}

export default PlaceLanguageDetail;