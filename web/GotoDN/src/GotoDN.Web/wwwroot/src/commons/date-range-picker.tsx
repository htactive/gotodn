import * as React from 'react';
import DatePicker from 'react-datepicker';
import * as moment from 'moment';

interface thisProps {
  Date?: any,
  onDateChanged?: (value) => void,
}

interface thisState {
}

const DATE_FORMAT = ["DD/MM/YYYY", "D/M/YYYY"];

export class DateRangePicker extends React.Component<thisProps, thisState> {

  render() {
    debugger;
    let date = this.props.Date ? moment(this.props.Date) : moment();
    return (
      <div className="date-picker">
        <div className="date-picker-start">
          <DatePicker
            selected={date}
            locale="vi-vn"
            className="form-control input-sm start-date"
            onChange={(value) => this.props.onDateChanged(value)}
            forceShowMonthNavigation={true}
            todayButton={"Ngày hiện tại"}
            dateFormat={DATE_FORMAT}
            readOnly
            isClearable
          />
        </div>
      </div>
    );
  }

  private onDateChanged(value: any) {
    console.log(value);
  }
}