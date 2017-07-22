import * as React from 'react';
import {FieldValueModel} from "../../../models/field-value-model";
import {DynamicFieldModel} from "../../../models/dynamic-field-model";

interface thisProps {
  FieldValue: FieldValueModel,
  Field: DynamicFieldModel,
  onFieldValueChange: (status: boolean) => void
}

export class ToggleComponent extends React.Component<thisProps, {}> {
  render() {
    let isInvalid = this.props.FieldValue.ValidateResult && this.props.FieldValue.ValidateResult.IsInvalid;
    return (
      <div className={`form-group col-lg-12${isInvalid ? ' has-error' : ''}`}>
        <label className="col-lg-3 col-md-3 control-label">{this.props.Field.FieldStructure.Name}</label>
        <div className="col-lg-9 col-md-9">
          <div className="toggle-custom">
            <label className="toggle" data-on="ON" data-off="OFF">
              <input className="form-control" type="checkbox"
                     placeholder={this.props.Field.FieldStructure.PlaceHolder}
                     checked={this.props.FieldValue.Value || false}
                     onChange={(e) => {
                       this.props.onFieldValueChange(e.target.checked);
                     }}
              />
              <span className="button-checkbox"></span>
            </label>
          </div>

          {isInvalid ?
            <span className="help-block">{this.props.FieldValue.ValidateResult.InvalidMessage}</span> : null}
        </div>
      </div>
    );
  }
}