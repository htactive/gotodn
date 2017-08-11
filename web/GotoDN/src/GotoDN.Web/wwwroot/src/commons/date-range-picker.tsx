import * as React from 'react';
import DatePicker from 'react-datepicker';
import * as moment from 'moment';
import {TimeHelper} from "./constant";

interface thisProps {
  Date?: any,
  onDateChanged?: (value) => void,
}

interface thisState {
}

const DATE_FORMAT = ["DD/MM/YYYY", "D/M/YYYY"];

export class DateRangePicker extends React.Component<thisProps, thisState> {

  render() {
    let date = this.props.Date ? moment(this.props.Date) : '';
    return (
      <div className="date-picker">
        <div className="date-picker-start">
          <DatePicker
            selected={date}
            locale="vi-vn"
            className="form-control input-sm start-date"
            onChange={(value) => {
              this.props.onDateChanged(TimeHelper.convertToDay(value._d));
            }}
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