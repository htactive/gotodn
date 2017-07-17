import * as React from 'react';
import * as ReactSelect from 'react-select';

interface thisProps {
  placeHolder?: string,
  value?: number,
  options?: ReactSelectModel[],
  onChange?: (e) => void,
}

export interface ReactSelectModel {
  value: number,
  label: string,
}

export class ComboBox extends React.Component<thisProps, any> {

  onChange(e: any) {
    this.props.onChange && this.props.onChange(e);
  }

  render() {
    return (
      <ReactSelect
        placeholder={this.props.placeHolder || ""}
        value={this.props.value}
        options={this.props.options || ""}
        onChange={e => this.onChange(e)}
        simpleValue
        disabled={false}
        searchable={true}
      />
    )
  }
}