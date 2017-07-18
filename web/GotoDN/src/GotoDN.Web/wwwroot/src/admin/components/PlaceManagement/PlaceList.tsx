import * as React from 'react';
import {PlaceModel} from "../../../models/PlaceModel";
import PlaceItem from "./PlaceItem";

interface thisProps {
  Places: PlaceModel[],
  SelectedPlace: PlaceModel,
  ChangeSelectedPlace: (model: PlaceModel) => void,
  CreatePlace: () => void,
}
interface thisState {

}

class PlaceList extends React.Component<thisProps, thisState> {
  state: thisState = {};

  componentWillMount() {
  }

  private createPlace() {
    this.props.CreatePlace && this.props.CreatePlace();
  }

  render() {
    return (
      <div className="col-lg-4">
        <h3>Danh sách địa điểm và sự kiện</h3>
        <hr/>
        <ul className="list-group">
          {this.props.Places ? this.props.Places.map(x =>
            <PlaceItem key={x.Id} Model={x}
                          IsSelected={this.props.SelectedPlace && x.Id == this.props.SelectedPlace.Id}
                          changeSelectedPlace={() => this.props.ChangeSelectedPlace(x)}
            />) : null}
        </ul>
        <hr/>
        <div className="form-group">
          <button className="btn btn-primary"
                  onClick={() => this.createPlace()}><i
            className="fa fa-plus"/> Thêm
          </button>
        </div>
      </div>
    );
  }
}

export default PlaceList;