import * as React from 'react';
import {HTServiceModel} from "../../../models/HTServiceModel";
interface thisProps {
  Model: HTServiceModel,
  IsSelected: boolean,
  changeSelectedHTService: () => void,
}
interface thisState {
}
class HTServiceItem extends React.Component<thisProps, thisState> {
  componentWillMount() {
    this.setState({});
  }

  render() {
    let firstLanguage = this.props.Model.HTServiceLanguages.sort((a, b) => a.Language - b.Language)[0];
    return (
      <a className={`list-group-item sub-item${this.props.IsSelected ? ' active' : ''}`}
         onClick={() => this.props.changeSelectedHTService()}>
        {(firstLanguage ? firstLanguage.Title : '') || ('Chưa đặt tên')}
      </a>);
  }
}


export default HTServiceItem;