import * as React from 'react';
import {
  FieldValueModel,
} from '../../../models/field-value-model';
import {DynamicFieldComponent} from './DynamicFieldComponent';
import {DynamicFormModel} from "../../../models/dynamic-form-model";
import {DynamicFieldModel} from "../../../models/dynamic-field-model";

interface thisProps {
  FormSet: DynamicFormModel,
  FieldValues: FieldValueModel[],
  onFieldValueChange: (fv: FieldValueModel) => void
}

export class DynamicFormComponent extends React.Component<thisProps, {}> {
  render() {
    return (<div className="panel panel-default plain toggle">
      <div className="panel-heading">

        <h4 className="panel-title bb uppercase">
          <strong> <i className={this.props.FormSet.Icon}/> {this.props.FormSet.Title}
          </strong></h4>
      </div>
      <div className="panel-body">
        <div className="form-horizontal">
          <fieldset>
            {this.props.FormSet.DynamicFields && this.props.FormSet.DynamicFields.length > 0 ?
              this.props.FormSet.DynamicFields.map((field, fieldIndex) => (
                <DynamicFieldComponent
                  Field={field}
                  FieldValue={this.props.FieldValues.filter(x => x.FieldStructure.FieldName == field.FieldStructure.FieldName)[0] || {Id: 0}}
                  onFieldValueChange={(fv: FieldValueModel) => this.onFieldValueChange(fv)}
                  key={fieldIndex}/>))
              : null
            }
          </fieldset>
        </div>
      </div>
    </div>);
  }

  private  onFieldValueChange(fv: FieldValueModel) {
    this.props.onFieldValueChange(fv);
  }
}

