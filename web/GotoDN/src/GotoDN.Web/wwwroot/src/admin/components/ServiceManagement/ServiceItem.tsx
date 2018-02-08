import * as React from 'react';
import {HTServiceModel} from "../../../models/HTServiceModel";
interface thisProps {
  Model: HTServiceModel,
  IsSelected: boolean,
  changeSelectedHTService: () => void,
  DeleteService:(Id: number) => void,
}
interface thisState {
}
class HTServiceItem extends React.Component<thisProps, thisState> {
  state = {
    hoverOnDelete: false,
  };
  componentWillMount() {
    this.setState({});
  }

  render() {
    let firstLanguage = this.props.Model.HTServiceLanguages.sort((a, b) => a.Language - b.Language)[0];
    return (
      <a className={`list-group-item sub-item${this.props.IsSelected ? ' active' : ''}`}
         onClick={() => this.state.hoverOnDelete || this.props.changeSelectedHTService()}>
        {(firstLanguage ? firstLanguage.Title : '') || ('Chưa đặt tên')}
        <span className="pull-right">
          <button className="btn btn-xs btn-danger"
                  onMouseEnter={() => {this.setState({hoverOnDelete: true})}}
                  onMouseLeave={() => {this.setState({hoverOnDelete: false})}}
                  onClick={() => {this.deleteCategory()}}>
             <i className="fa fa-trash" aria-hidden="true"/></button>
        </span>
      </a>);
  }

  private deleteCategory() {
    this.props.DeleteService && this.props.DeleteService(this.props.Model.Id);
  }
}


export default HTServiceItem;