import * as React from 'react';
import {CategoryLanguageModel} from "../../../models/CategoryLanguageModel";
import {DynamicPanelComponent} from "../DynamicForm/DynamicPanelComponent";
import {DynamicFormModel} from "../../../models/dynamic-form-model";
import {DynamicFieldModel} from "../../../models/dynamic-field-model";
import {FieldStructureTypeEnums} from "../../../models/field-structure-model";
import {ValidateRuleTypeEnums} from "../../../commons/constant";
interface thisProps {
  CategoryLanguage: CategoryLanguageModel,
  IsSelected?: boolean
}

interface thisState {
  EditingObject?: CategoryLanguageModel
}

class CategoryLanguageDetail extends React.Component<thisProps, thisState> {
  editingForm: DynamicPanelComponent;
  state: thisState = {};

  setState(state: thisState) {
    super.setState(state);
  }

  componentWillMount() {
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(props: thisProps) {
    if (props.CategoryLanguage) {
      let editingObject = {...props.CategoryLanguage};
      if (!this.state.EditingObject || this.state.EditingObject.Id != editingObject.Id) {
        this.setState({
          EditingObject: editingObject,
        });
      }
    } else {
      this.setState({
        EditingObject: null
      });
    }
  }

  render() {
    return (
      <div className={`tab-pane fade${this.props.IsSelected ? ' active in' : ''}`}>
        {this.props.CategoryLanguage ?
          <DynamicPanelComponent
            ref={(r) => this.editingForm = r}
            FormStructure={this.getFormStructure()}
            onFieldValueChange={(obj) => this.onFieldValueChange(obj)}
            Object={this.state.EditingObject}
          /> : null}
        <div className="form-horizontal">
          <fieldset>
            <div className="form-group col-lg-12 p0">
              <button className="btn btn-default pull-right"
                      onClick={() => this.discardChangesEditing()}>Làm lại
              </button>
              <button className="btn btn-primary pull-right"
                      onClick={() => this.saveCategory()}>Lưu
              </button>
            </div>
          </fieldset>
        </div>
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
      inforForm.DynamicFields.push(f_Title);
      allForms.push(inforForm);
    }
    return allForms;
  }

  private onFieldValueChange(obj: any) {
    this.setState({
      EditingObject: obj
    });
  }

  private discardChangesEditing() {
    this.setState({
      EditingObject: {...this.props.CategoryLanguage}
    });
  }

  private saveCategory() {
    if (this.editingForm.isFormValid()) {

    }
    this.forceUpdate();
  }
}

export default CategoryLanguageDetail;