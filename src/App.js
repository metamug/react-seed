import React, { Component } from 'react'
import { Switch, Route} from "react-router-dom";
import AppNavbar from './components/AppNavbar';
import Form from './components/Form'
import Table from './components/Table'
import Home from './components/Home'
export default class App extends Component {
  render() {
    return (
      <div>
        <AppNavbar/>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/table" component={Table}/>
          <Route path="/form" component={Form}/>
        </Switch>
        {this.props.children}
      </div>
    )
  }
}

