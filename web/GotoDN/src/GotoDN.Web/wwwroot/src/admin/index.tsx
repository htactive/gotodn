import * as React from 'react';
import {UIBlocker} from "../commons/ui-blocker";
import {MessageBox} from "../commons/message-box";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Sidebar from "./components/Sidebar/Sidebar";
import Breadcrumb from './components/Breadcrumb/Breadcrumb';
import Aside from "./components/Aside/Aside";
export class Index extends React.Component<any, any> {
  render() {
    return (<div className="app">
      <Header />
      <div className="app-body">
        <Sidebar {...this.props}/>
        <main className="main">
          {/*<Breadcrumb />*/}
          <div className="container-fluid">
            {this.props.children}
          </div>
        </main>
        <Aside />
      </div>
      <Footer />
      <UIBlocker/>
      <MessageBox/>
    </div>);
  }
}