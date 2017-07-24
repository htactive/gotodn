import * as React from 'react';
import {UIBlocker} from "../commons/ui-blocker";
import {MessageBox} from "../commons/message-box";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Breadcrumb from './components/Breadcrumb/Breadcrumb';
import Aside from "./components/Aside/Aside";
export class Index extends React.Component<any, any> {
  componentDidMount(){
    window['initDynamicTemplate']();
  }
  render() {
    return (
      <div>
        <Header/>
        <div id="wrapper">
          <Sidebar/>
          <div className="page-content sidebar-page right-sidebar-page clearfix">
            {this.props.children}
          </div>
        </div>
        <Footer/>
        <UIBlocker/>
        <MessageBox/>
      </div>);
  }
}