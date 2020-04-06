import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import AppNavbar from './components/AppNavbar';
import Form from './components/dummyform';
import Table from './components/Table';
import Graph from './components/Graph';
import Home from './components/Home';
export default class App extends Component {
  render() {
    return (
      <div>
        <AppNavbar />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/table' component={Table} />
          <Route path='/form' component={Form} />
          <Route path='/graph' component={Graph} />
        </Switch>
        {this.props.children}
      </div>
    );
  }
}
