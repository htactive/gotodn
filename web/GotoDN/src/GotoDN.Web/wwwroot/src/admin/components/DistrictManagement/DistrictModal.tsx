import * as React from 'react';
import {Modal, Button, Form, FormGroup, Col} from 'react-bootstrap';
import {DynamicFieldModel} from "../../../models/dynamic-field-model";
import {FieldStructureTypeEnums} from "../../../models/field-structure-model";
import {ValidateRuleTypeEnums} from "../../../commons/constant";
import {DynamicFormModel} from "../../../models/dynamic-form-model";
import {DynamicPanelComponent} from "../DynamicForm/DynamicPanelComponent";
import {CityModel, DistrictModel} from "../../../models/CityModel";
import {ComboBox, ReactSelectModel} from "../ComboBox/ComboBox";


interface thisProps {
  SelectedDistrict?: DistrictModel,
  OnChange?: (model: DistrictModel) => void,
  SaveDistrict?: (model: DistrictModel) => void,
  deleteDistrict?: (Id: number) => void,
  Cities?: CityModel[],
  ClickSlectCity?: (Id: number) => void,
}

interface thisState {
  isShow?: boolean,
}

class DistrictModal extends React.Component<thisProps, thisState> {
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
    if (!this.props.SelectedDistrict) return null;
    let Cities: ReactSelectModel[] = [];
    if (this.props.Cities && this.props.Cities.length > 0) {
      Cities = this.props.Cities.map(
        x => {
          return {label: x.Name || "Chưa đặt tên", value: x.Id}
        }
      );
    }

    return (
      <Modal show={this.state.isShow} onHide={() => this.close()}
             aria-labelledby="contained-modal-title-lg">
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-lg">Quận huyện</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="panel panel-default plain">
            <div className="panel-body">
              <div className="form-group">
                <DynamicPanelComponent
                  FormStructure={this.getFormStructure()}
                  onFieldValueChange={(obj: DistrictModel) => this.props.OnChange(obj)}
                  Object={this.props.SelectedDistrict}
                  onValidationChange={(isInvalid) => {
                    this.props.SelectedDistrict['__#isInvalid#__'] = isInvalid
                  }}
                />
              </div>

              <div className="form-horizontal" style={{marginBottom:100}}>
                <fieldset>
                  <div className="form-group col-sm-12 p0">
                    <label className="col-sm-3 control-label">Tỉnh thành</label>
                    <div className="col-sm-9">
                      <ComboBox
                        placeHolder="Chọn tỉnh thành..."
                        options={Cities}
                        value={this.props.SelectedDistrict.CityId}
                        onChange={(Id) => this.props.ClickSlectCity(Id)}
                      />
                    </div>
                  </div>
                </fieldset>
              </div>
            </div>
          </div>
          <div className="form-group col-sm-12">
            <button className="btn btn-danger pull-right" style={{marginLeft: 5}}
                    onClick={() => this.deleteDistrict()}><i className="fa fa-trash-o"/> Xóa
            </button>

            <button className="btn btn-primary pull-right"
                    onClick={() => this.saveDistrict()}><i
              className="fa fa-save"/> Lưu
            </button>

          </div>
        </Modal.Body>
      </Modal>
    )
  }

  private saveDistrict() {
    this.props.SelectedDistrict['__#validated#__'] = true;
    if (this.props.SelectedDistrict['__#isInvalid#__']) {
      return;
    }
    this.props.SaveDistrict && this.props.SaveDistrict(this.props.SelectedDistrict);
    this.close();
  }

  private deleteDistrict() {
    this.props.deleteDistrict && this.props.deleteDistrict(this.props.SelectedDistrict.Id);
    this.close();
  }
}

export default DistrictModal;