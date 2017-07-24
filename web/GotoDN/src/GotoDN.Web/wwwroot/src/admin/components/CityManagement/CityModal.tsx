import * as React from 'react';
import {Modal, Button, Form, FormGroup, Col} from 'react-bootstrap';
import {DynamicFieldModel} from "../../../models/dynamic-field-model";
import {FieldStructureTypeEnums} from "../../../models/field-structure-model";
import {ValidateRuleTypeEnums} from "../../../commons/constant";
import {DynamicFormModel} from "../../../models/dynamic-form-model";
import {DynamicPanelComponent} from "../DynamicForm/DynamicPanelComponent";
import {CityModel} from "../../../models/CityModel";


interface thisProps {
  SelectedCity?: CityModel,
  OnChange?: (model: CityModel) => void,
  SaveCity?: (model: CityModel) => void,
  deleteCity?: (Id: number) => void,
}

interface thisState {
  isShow?: boolean,
}

class CityModal extends React.Component<thisProps, thisState> {
  componentWillMount() {
    this.setState({isShow: false});
  }

  close() {
    this.setState({isShow: false});
  }

  show() {
    this.setState({isShow: true});
  }

  private getFormStructure(): DynamicFormModel[] {
    let allForms: DynamicFormModel[] = [];
    {
      let inforForm: DynamicFormModel = {
        Icon: 'fa fa-info',
        Priority: 1,
        Title: '',
        BlankPanel: true,
        DynamicFields: [],
      };
      let f_Title: DynamicFieldModel = {
        Priority: 1,
        LabelClass: 'col-lg-3',
        InputClass: 'col-lg-9',
        FieldStructure: {
          Name: 'Tên',
          FieldName: 'Name',
          PlaceHolder: '',
          Type: FieldStructureTypeEnums.TextBox,
          ValidateRules: [
            {
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

  render() {
    if(!this.props.SelectedCity) return null;
    return (
      <Modal show={this.state.isShow} onHide={() => this.close()}
             aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Tỉnh thành</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="panel panel-default plain">
            <div className="panel-body">
              <div className="form-group col-sm-12">
                <DynamicPanelComponent
                  FormStructure={this.getFormStructure()}
                  onFieldValueChange={(obj: CityModel) => this.props.OnChange(obj)}
                  Object={this.props.SelectedCity}
                  onValidationChange={(isInvalid) => {
                    this.props.SelectedCity['__#isInvalid#__'] = isInvalid
                  }}
                />
              </div>
            </div>
          </div>
          <div className="form-group col-sm-12">
            <button className="btn btn-danger pull-right" style={{marginLeft: 5}}
                    onClick={() => this.deleteCity()}><i className="fa fa-trash-o"/> Xóa
            </button>

            <button className="btn btn-primary pull-right"
                    onClick={() => this.saveCity()}><i
              className="fa fa-save"/> Lưu
            </button>

          </div>
        </Modal.Body>
      </Modal>
    )
  }

  private saveCity() {
    this.props.SelectedCity['__#validated#__'] = true;
    if (this.props.SelectedCity['__#isInvalid#__']) {
      return;
    }
    this.props.SaveCity && this.props.SaveCity(this.props.SelectedCity);
    this.close();
  }

  private deleteCity() {
    this.props.deleteCity && this.props.deleteCity(this.props.SelectedCity.Id);
    this.close();
  }
}

export default CityModal;