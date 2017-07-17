import * as React from 'react';
import {HTServiceModel} from "../../../models/HTServiceModel";
import HTServiceItem from "./ServiceItem";

interface thisProps {
  HTServices: HTServiceModel[],
  SelectedHTService: HTServiceModel,
  ChangeSelectedService: (model: HTServiceModel) => void,
  CreateHTService: () => void,
}
interface thisState {

}

class HTServiceList extends React.Component<thisProps, thisState> {
  state: thisState = {};

  componentWillMount() {
  }

  private createHTService() {
    this.props.CreateHTService && this.props.CreateHTService();
  }

  render() {
    return (
      <div className="col-lg-4">
        <h3>Danh sách dịch vụ</h3>
        <hr/>
        <ul className="list-group">
          {this.props.HTServices ? this.props.HTServices.map(x =>
            <HTServiceItem key={x.Id} Model={x}
                          IsSelected={this.props.SelectedHTService && x.Id == this.props.SelectedHTService.Id}
                          changeSelectedHTService={() => this.props.ChangeSelectedService(x)}
            />) : null}
        </ul>
        <hr/>
        <div className="form-group">
          <button className="btn btn-primary"
                  onClick={() => this.createHTService()}><i
            className="fa fa-plus"/> Thêm dịch vụ
          </button>
        </div>
      </div>
    );
  }
}

export default HTServiceList;