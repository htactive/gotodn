import * as React from 'react';
import {PlaceModel} from "../../../models/PlaceModel";
interface thisProps {
  Model: PlaceModel,
  IsSelected: boolean,
  changeSelectedPlace: () => void,
}
interface thisState {
}
class PlaceItem extends React.Component<thisProps, thisState> {
  componentWillMount() {
    this.setState({});
  }

  render() {
    let firstLanguage = this.props.Model.PlaceLanguages.sort((a, b) => a.Language - b.Language)[0];
    return (
      <a className={`list-group-item${this.props.IsSelected ? ' active' : ''}`}
         onClick={() => this.props.changeSelectedPlace()}>
        {(firstLanguage ? firstLanguage.Title : '') || ('Chưa đặt tên')}
      </a>);
  }
}


export default PlaceItem;