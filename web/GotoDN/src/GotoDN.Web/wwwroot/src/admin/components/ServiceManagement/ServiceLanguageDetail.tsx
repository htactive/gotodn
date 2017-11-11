import * as React from 'react';
import {HTServiceLanguageModel} from "../../../models/HTServiceLanguageModel";
import {DynamicPanelComponent} from "../DynamicForm/DynamicPanelComponent";
import {DynamicFormModel} from "../../../models/dynamic-form-model";
import {DynamicFieldModel} from "../../../models/dynamic-field-model";
import {FieldStructureTypeEnums} from "../../../models/field-structure-model";
import {ValidateRuleTypeEnums, LanguageEnums} from "../../../commons/constant";
import {MessageBox, MessageBoxType, MessageBoxButtons, MessageBoxResult} from "../../../commons/message-box";
import {HTServiceModel} from "../../../models/HTServiceModel";
import {HTServiceInstance} from "../../services/HTService";
interface thisProps {
  HTServiceLanguage: HTServiceLanguageModel,
  EnHTServiceLanguage: HTServiceLanguageModel,
  IsSelected: boolean,
  OnObjectChange: (obj: HTServiceLanguageModel) => void
}

interface thisState {
  EditingObjec1t?: HTServiceLanguageModel
}

class ServiceLanguageDetail extends React.Component<thisProps, thisState> {
  editingForm: DynamicPanelComponent;
  state: thisState = {};

  setState(state: thisState) {
    super.setState(state);
  }

  render() {
    return (
      <div className={`tab-pane fade${this.props.IsSelected ? ' active in' : ''}`}>
        {this.props.HTServiceLanguage ?
          <DynamicPanelComponent
            ref={(r) => this.editingForm = r}
            FormStructure={this.getFormStructure()}
            onFieldValueChange={(obj) => {
              this.props.OnObjectChange(obj)
            }}
            Object={this.props.HTServiceLanguage}
            onValidationChange={(isInvalid) => {
              this.props.HTServiceLanguage['__#isInvalid#__'] = isInvalid
            }}
          /> : null}
        {this.props.HTServiceLanguage && this.props.HTServiceLanguage.Language != LanguageEnums.English ?
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
              Type: ValidateRuleTypeEnums.MaxLength,
              InValidMessage: 'Không được vượt quá 50 ký tự',
              RuleData: '50'
            }
          ]
        }
      };

      inforForm.DynamicFields.push(f_Title);
      allForms.push(inforForm);
    }
    return allForms;
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
      let serviceModel: HTServiceModel = {Id: 0, HTServiceLanguages: [], ShowInAllCity: false};

      serviceModel.HTServiceLanguages.push(this.props.HTServiceLanguage, this.props.EnHTServiceLanguage);
      let translatedServiceLang = await HTServiceInstance.TranslateService(serviceModel);
      if(translatedServiceLang != null && this.props.OnObjectChange) {
        this.props.OnObjectChange(translatedServiceLang);
      }
    }
  }
}

export default ServiceLanguageDetail;