import * as React from 'react';
import {DynamicFormModel} from "../../../models/dynamic-form-model";
import {FieldValueModel} from "../../../models/field-value-model";
import {FieldStructureModel} from "../../../models/field-structure-model";
import {ValidateRuleTypeEnums} from "../../../commons/constant";
import {Validation} from "../../../commons/validate-helper";
import {DynamicFormComponent} from "./DynamicFormComponent";
interface thisProps {
  FormStructure: DynamicFormModel[],
  onFieldValueChange: (obj: any) => void,
  onValidationChange?: (isInvalid: boolean) => void,
  Object: any
}

interface thisState {
  FieldValues: FieldValueModel[]
}

export class DynamicPanelComponent extends React.Component<thisProps, thisState> {
  componentWillMount() {
    this.setState({});
    this.componentWillReceiveProps(this.props);
  }

  componentWillReceiveProps(props: thisProps) {
    this.setState({
      FieldValues: this.getFieldValues(props.FormStructure, props.Object)
    });
  }

  focusOnInvalidField() {
    $(".has-error:first :input").focus();
  }

  render() {
    return (
      <div>
        {this.props.FormStructure ?
          this.props.FormStructure.map((form, index) =>
            <DynamicFormComponent
              FormSet={form}
              key={form.Title}
              FieldValues={this.state.FieldValues}
              onFieldValueChange={(fv) => this.onFieldValueChange(fv)}
            />
          )
          : null}
      </div>

    );
  }

  private getFieldValues(formStructure: DynamicFormModel[], object: any): FieldValueModel[] {
    let fields: FieldValueModel[] = [];
    if (object) {
      fields = this.initFieldValues(formStructure, fields, object);
    }
    return fields;
  }

  initFieldValues(forms: DynamicFormModel[], fieldValues: FieldValueModel[], object: any): FieldValueModel[] {
    let isValid = true;
    forms.forEach((c, ci) => {
      c && c.DynamicFields.forEach((f, fi) => {
        if (!fieldValues.some(x => x.FieldStructure.FieldName == f.FieldStructure.FieldName)) {
          let fv: FieldValueModel = {
            Id: 0,
            FieldStructure: f.FieldStructure,
            ValueNumber: 0,
            Value: '',
            ValidateResult: {
              IsInvalid: false,
              InvalidMessage: ''
            }
          };
          if (f.FieldStructure && f.FieldStructure.ObjectGetter) {
            fv.Value = f.FieldStructure.ObjectGetter(object);
          } else {
            fv.Value = object[f.FieldStructure.FieldName];
          }
          isValid = this.validateFieldValue(fv, f.FieldStructure, !object['__#validated#__']) && isValid;
          fieldValues.push(fv);
        }
      });
    });
    this.props.onValidationChange && this.props.onValidationChange(!isValid);
    return fieldValues;
  }

  private onFieldValueChange(fv: FieldValueModel) {
    let cfv: FieldValueModel = this.state.FieldValues.filter(x => x.FieldStructure.FieldName == fv.FieldStructure.FieldName)[0];
    cfv.Value = fv.Value;

    cfv.ValueNumber = fv.ValueNumber;debugger;
    cfv.ValueString = fv.ValueString;
    let fieldStructure: FieldStructureModel = (this.props.FormStructure.map(x => x.DynamicFields)
      .reduce((a, b) => a.concat(b)).filter(x => x.FieldStructure.FieldName == cfv.FieldStructure.FieldName)[0]
    || {FieldStructure: null}).FieldStructure;

    let object = {...this.props.Object};
    if (fieldStructure) {
      if (fieldStructure.ObjectSetter) {
        fieldStructure.ObjectSetter(object, cfv.Value);
      } else {
        object[fieldStructure.FieldName] = cfv.Value;
      }
    }
    let isInvalid = this.isFormValid();
    this.props.onValidationChange && this.props.onValidationChange(isInvalid);
    this.props.onFieldValueChange(object);
  }

  private validateFieldValue(fv: FieldValueModel, fieldStructure: FieldStructureModel, forDummy?: boolean): boolean {
    let validateRules = fieldStructure.ValidateRules;
    for (let i = 0; i < validateRules.length; i++) {
      let rule = validateRules[i];
      switch (rule.Type) {
        case ValidateRuleTypeEnums.Required:
          if (!Validation.validateNull(fv.Value)) {
            if (forDummy) {
              return false;
            }
            fv.ValidateResult.IsInvalid = true;
            fv.ValidateResult.InvalidMessage = rule.InValidMessage;
            return false;
          }
          break;
        case ValidateRuleTypeEnums.MinLength:
          let min = parseInt(rule.RuleData);
          if (!Validation.validateLength(fv.Value, min)) {
            if (forDummy) {
              return false;
            }
            fv.ValidateResult.IsInvalid = true;
            fv.ValidateResult.InvalidMessage = rule.InValidMessage;
            return false;
          }
          break;
        case ValidateRuleTypeEnums.MaxLength:
          let max = parseInt(rule.RuleData);
          if (!Validation.validateLength(fv.Value, max, true)) {
            if (forDummy) {
              return false;
            }
            fv.ValidateResult.IsInvalid = true;
            fv.ValidateResult.InvalidMessage = rule.InValidMessage;
            return false;
          }
          break;
        case ValidateRuleTypeEnums.IsAnEmail:
          if (!Validation.validateEmail(fv.Value)) {
            if (forDummy) {
              return false;
            }
            fv.ValidateResult.IsInvalid = true;
            fv.ValidateResult.InvalidMessage = rule.InValidMessage;
            return false;
          }
          break;
        case ValidateRuleTypeEnums.CustomExpression:
          if (!Validation.validateRegex(fv.Value, rule.RuleData)) {
            if (forDummy) {
              return false;
            }
            fv.ValidateResult.IsInvalid = true;
            fv.ValidateResult.InvalidMessage = rule.InValidMessage;
            return false;
          }
          break;
        case ValidateRuleTypeEnums.MinValue:
          let minValue = parseInt(rule.RuleData);
          if (fv.Value < minValue) {
            if (forDummy) {
              return false;
            }
            fv.ValidateResult.IsInvalid = true;
            fv.ValidateResult.InvalidMessage = rule.InValidMessage;
            return false;
          }
          break;
        case ValidateRuleTypeEnums.MaxValue:
          let maxValue = parseInt(rule.RuleData);
          if (fv.Value > maxValue) {
            if (forDummy) {
              return false;
            }
            fv.ValidateResult.IsInvalid = true;
            fv.ValidateResult.InvalidMessage = rule.InValidMessage;
            return false;
          }
          break;
        case ValidateRuleTypeEnums.NotEquals:
          if (fv.Value === rule.RuleData) {
            if (forDummy) {
              return false;
            }
            fv.ValidateResult.IsInvalid = true;
            fv.ValidateResult.InvalidMessage = rule.InValidMessage;
            return false;
          }
          break;
        case ValidateRuleTypeEnums.IsAPhoneNumber:
          // @TODO: không cần rule type này nữa.
          break;

      }
    }
    fv.ValidateResult.IsInvalid = false;
    fv.ValidateResult.InvalidMessage = '';
    return true;
  }

  public isFormValid(): boolean {
    this.props.Object['__#validated#__'] = true;
    let isValid = true;
    this.state.FieldValues.forEach(cfv => {
      let fieldStructure: FieldStructureModel = (this.props.FormStructure.map(x => x.DynamicFields)
        .reduce((a, b) => a.concat(b)).filter(x => x.FieldStructure.FieldName == cfv.FieldStructure.FieldName)[0] || {FieldStructure: null}).FieldStructure;
      if (fieldStructure) {
        isValid = this.validateFieldValue(cfv, fieldStructure) && isValid;
      }
    });
    this.focusOnInvalidField();
    return isValid;
  }
}