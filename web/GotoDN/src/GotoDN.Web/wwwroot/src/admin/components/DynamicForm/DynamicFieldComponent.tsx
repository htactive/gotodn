import * as React from 'react';
import {FieldValueModel} from '../../../models/field-value-model';
import ReactElement = React.ReactElement;
import {DynamicFieldModel} from "../../../models/dynamic-field-model";
import {FieldStructureTypeEnums, SelectInitValueModel} from "../../../models/field-structure-model";
import {ToggleComponent} from "./ToggleComponent";
import {SingleImageUploadComponent} from "./SingleImageUploadComponent";
import {RichTextEditorComponent} from "./RichTextEditorComponent";
interface thisProps {
  Field: DynamicFieldModel,
  onFieldValueChange: (fv: FieldValueModel) => void,
  FieldValue: FieldValueModel
}

interface thisState {
}

export class DynamicFieldComponent extends React.Component<thisProps, thisState> {

  renderTextBoxField(): JSX.Element {
    let isInvalid = this.props.FieldValue.ValidateResult && this.props.FieldValue.ValidateResult.IsInvalid;
    return (
      <div className={`form-group col-lg-12${isInvalid ? ' has-error' : ''} p0`}>
        <label
          className={`${this.props.Field.LabelClass ? this.props.Field.LabelClass : 'col-lg-2 col-md-3'} control-label`}>
          {this.props.Field.FieldStructure.Name}
        </label>
        <div className={`${this.props.Field.InputClass ? this.props.Field.InputClass : 'col-lg-10 col-md-9'}`}>
          <input className="form-control" type="text"
                 placeholder={this.props.Field.FieldStructure.PlaceHolder}
                 value={this.props.FieldValue.Value}
                 onChange={(e) => {
                   let fv = {...this.props.FieldValue};
                   fv.Value = e.target['value'];
                   this.props.onFieldValueChange(fv);
                 }}
          />
          {isInvalid ?
            <span className="help-block">{this.props.FieldValue.ValidateResult.InvalidMessage}</span> : null}
        </div>
      </div>
    );
  }

  renderStaticLabel(): JSX.Element {
    return (
      <div className={`form-group col-lg-12 p0`}>
        <label
          className={`${this.props.Field.LabelClass ? this.props.Field.LabelClass : 'col-lg-2 col-md-3'} control-label`}>
          {this.props.Field.FieldStructure.Name}</label>
        <div className={`${this.props.Field.InputClass ? this.props.Field.InputClass : 'col-lg-10 col-md-9'}`}>
          <label className="form-control-static">{this.props.FieldValue.Value}</label>
        </div>
      </div>
    );
  }

  renderStaticControl(): JSX.Element {
    return (
      <div className={`form-group col-lg-12 p0`}>
        <label
          className={`${this.props.Field.LabelClass ? this.props.Field.LabelClass : 'col-lg-2 col-md-3'} control-label`}>
          {this.props.Field.FieldStructure.Name}</label>
        <div className={`${this.props.Field.InputClass ? this.props.Field.InputClass : 'col-lg-10 col-md-9'}`}>
          {this.props.FieldValue.Value}
        </div>
      </div>
    );
  }

  renderNumberField(): JSX.Element {
    let isInvalid = this.props.FieldValue.ValidateResult && this.props.FieldValue.ValidateResult.IsInvalid;
    return (
      <div className={`form-group col-lg-12 p0${isInvalid ? ' has-error' : ''}`}>
        <label
          className={`${this.props.Field.LabelClass ? this.props.Field.LabelClass : 'col-lg-2 col-md-3'} control-label`}>
          {this.props.Field.FieldStructure.Name}</label>
        <div className={`${this.props.Field.InputClass ? this.props.Field.InputClass : 'col-lg-10 col-md-9'}`}>
          <input className="form-control" type="text"
                 placeholder={this.props.Field.FieldStructure.PlaceHolder}
                 value={this.props.FieldValue.Value}
                 onChange={(e) => {
                   let fv = {...this.props.FieldValue};
                   let val = e.target['value'];
                   val = val.replace(/[^0-9]/g, '');
                   fv.Value = val;
                   this.props.onFieldValueChange(fv);
                 }}
          />
          {isInvalid ?
            <span className="help-block">{this.props.FieldValue.ValidateResult.InvalidMessage}</span> : null}
        </div>
      </div>
    );
  }

  renderSplitterField(): JSX.Element {
    return (<hr/>);
  }

  private renderTextAreaField(): JSX.Element {
    let isInvalid = this.props.FieldValue.ValidateResult && this.props.FieldValue.ValidateResult.IsInvalid;
    return (
      <div className={`form-group col-lg-12 p0${isInvalid ? ' has-error' : ''}`}>
        <label
          className={`${this.props.Field.LabelClass ? this.props.Field.LabelClass : 'col-lg-2 col-md-3'} control-label`}>
          {this.props.Field.FieldStructure.Name}</label>
        <div className={`${this.props.Field.InputClass ? this.props.Field.InputClass : 'col-lg-10 col-md-9'}`}>
            <textarea className="form-control" rows={7}
                      placeholder={this.props.Field.FieldStructure.PlaceHolder}
                      value={this.props.FieldValue.Value}
                      onChange={(e) => {
                        let fv = {...this.props.FieldValue};
                        fv.Value = e.target['value'];
                        this.props.onFieldValueChange(fv);
                      }}
            />

          {isInvalid ?
            <span className="help-block">{this.props.FieldValue.ValidateResult.InvalidMessage}</span> : null}
        </div>
      </div>
    );
  }

  private renderRadioGroupField(): JSX.Element {
    let isInvalid = this.props.FieldValue.ValidateResult && this.props.FieldValue.ValidateResult.IsInvalid;
    let selectInitValues: SelectInitValueModel[] = [];
    if (this.props.Field.FieldStructure.FieldData) {
      selectInitValues = JSON.parse(this.props.Field.FieldStructure.FieldData);
    }
    return (
      <div className={`form-group col-lg-12 p0 form-inline${isInvalid ? ' has-error' : ''}`}>
        <label
          className={`${this.props.Field.LabelClass ? this.props.Field.LabelClass : 'col-lg-2 col-md-3'} control-label`}>
          {this.props.Field.FieldStructure.Name}</label>
        <div className={`${this.props.Field.InputClass ? this.props.Field.InputClass : 'col-lg-10 col-md-9'}`}>
          {selectInitValues.map((v, vindex) => (
            <label className="radio-inline" key={vindex}>
              <input type="radio" name={`rd_${this.props.Field.FieldStructure.FieldName}`} onChange={(e) => {
                let fv = {...this.props.FieldValue};
                fv.Value = v.Value;
                this.props.onFieldValueChange(fv);
              } }/>{v.Text}
            </label>
          ))}
          {isInvalid ? <span className="help-block">{this.props.FieldValue.ValidateResult.InvalidMessage}</span> : null}
        </div>
      </div>
    );
  }

  private renderCheckboxGroupField(): JSX.Element {
    let isInvalid = this.props.FieldValue.ValidateResult && this.props.FieldValue.ValidateResult.IsInvalid;
    let selectInitValues: SelectInitValueModel[] = [];
    if (this.props.Field.FieldStructure.FieldData) {
      selectInitValues = JSON.parse(this.props.Field.FieldStructure.FieldData);
    }
    return (
      <div className={`form-group col-lg-12 p0 form-inline${isInvalid ? ' has-error' : ''}`}>
        <label
          className={`${this.props.Field.LabelClass ? this.props.Field.LabelClass : 'col-lg-2 col-md-3'} control-label`}>
          {this.props.Field.FieldStructure.Name}</label>
        <div className={`${this.props.Field.InputClass ? this.props.Field.InputClass : 'col-lg-10 col-md-9'}`}>
          {selectInitValues.map((v, vindex) => (
            <label className="checkbox-inline" key={vindex}>
              <input type="checkbox" onChange={(e) => {
                let fv = {...this.props.FieldValue};
                let items = [];
                if (fv.Value) {
                  items = JSON.parse(fv.Value);
                }
                items = items.filter(x => x !== v.Value);
                if (e.target.checked) {
                  items.push(v.Value);
                }
                if (items.length > 0) {
                  fv.Value = JSON.stringify(items);
                }
                else {
                  fv.Value = "";
                }
                this.props.onFieldValueChange(fv);
              }}/>{v.Text}
            </label>
          ))}
          {isInvalid ? <span className="help-block">{this.props.FieldValue.ValidateResult.InvalidMessage}</span> : null}
        </div>
      </div>
    );
  }

  private renderDropDownListField(): JSX.Element {
    let isInvalid = this.props.FieldValue.ValidateResult && this.props.FieldValue.ValidateResult.IsInvalid;
    let selectInitValues: SelectInitValueModel[] = [];
    if (this.props.Field.FieldStructure.FieldData) {
      selectInitValues = JSON.parse(this.props.Field.FieldStructure.FieldData);
    }
    return (
      <div className={`form-group col-lg-12 p0${isInvalid ? ' has-error' : ''}`}>
        <label
          className={`${this.props.Field.LabelClass ? this.props.Field.LabelClass : 'col-lg-2 col-md-3'} control-label`}>
          {this.props.Field.FieldStructure.Name}</label>
        <div className={`${this.props.Field.InputClass ? this.props.Field.InputClass : 'col-lg-10 col-md-9'}`}>
          <select className="form-control"
                  defaultValue={this.props.FieldValue.Value}
                  onChange={(e) => {
                    let fv = {...this.props.FieldValue};
                    fv.Value = e.target['value'];
                    this.props.onFieldValueChange(fv);
                  }}>
            {this.props.Field.FieldStructure.PlaceHolder ?

              <option value={''}>{this.props.Field.FieldStructure.PlaceHolder}</option>
              : null}
            {selectInitValues.map((v, vindex) => (

              <option key={vindex} value={v.Value}>{v.Text}</option>
            ))}

          </select>
          {isInvalid ?
            <span className="help-block">{this.props.FieldValue.ValidateResult.InvalidMessage}</span> : null}
        </div>
      </div>
    );
  }

  render() {

    if (this.props.Field.FieldStructure.Type == FieldStructureTypeEnums.StaticLabel) {
      return this.renderStaticLabel();
    }
    if (this.props.Field.FieldStructure.Type == FieldStructureTypeEnums.StaticControl) {
      return this.renderStaticControl();
    }
    if (this.props.Field.FieldStructure.Type == FieldStructureTypeEnums.TextBox) {
      return this.renderTextBoxField();
    }

    if (this.props.Field.FieldStructure.Type == FieldStructureTypeEnums.Number) {
      return this.renderNumberField();
    }
    if (this.props.Field.FieldStructure.Type == FieldStructureTypeEnums.TextArea) {
      return this.renderTextAreaField();
    }

    if (this.props.Field.FieldStructure.Type == FieldStructureTypeEnums.C_Splitter) {
      return this.renderSplitterField();
    }

    if (this.props.Field.FieldStructure.Type == FieldStructureTypeEnums.RadioGroup) {
      return this.renderRadioGroupField();
    }

    if (this.props.Field.FieldStructure.Type == FieldStructureTypeEnums.DropDownList) {
      return this.renderDropDownListField();
    }

    if (this.props.Field.FieldStructure.Type == FieldStructureTypeEnums.CheckBox) {
      return this.renderCheckboxGroupField();
    }

    if (this.props.Field.FieldStructure.Type == FieldStructureTypeEnums.Toggle) {
      return <ToggleComponent FieldValue={this.props.FieldValue} Field={this.props.Field}
                              onFieldValueChange={(v) => {
                                let fv = {...this.props.FieldValue};
                                fv.Value = v;
                                this.props.onFieldValueChange(fv);
                              }}
      />
    }

    if (this.props.Field.FieldStructure.Type == FieldStructureTypeEnums.SingleImage) {
      return <SingleImageUploadComponent FieldValue={this.props.FieldValue} Field={this.props.Field}
                                         onImageChanged={(img) => {
                                           let fv = {...this.props.FieldValue};
                                           fv.Value = img;
                                           this.props.onFieldValueChange(fv);
                                         }}
      />
    }
    if (this.props.Field.FieldStructure.Type == FieldStructureTypeEnums.RichTextEdit) {
      return <RichTextEditorComponent FieldValue={this.props.FieldValue} Field={this.props.Field}
                                      onFieldValueChange={
                                        (val) => {
                                          let fv = {...this.props.FieldValue};
                                          fv.Value = val;
                                          this.props.onFieldValueChange(fv);
                                        }
                                      }
      />
    }


    return this.renderTextBoxField();
  }
}