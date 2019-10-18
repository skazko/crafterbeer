import React, { Component } from 'react';
import BeerList from '../beer-list';
import CrafterbeerService from '../../service/crafterbeer-service'; 
import ErrorBoundry from '../error-boundry';
import './app.css';

export default class App extends Component {

  state = {
    api: new CrafterbeerService()
  }

  render() {
    return (
      <ErrorBoundry>
        <BeerList api={this.state.api} />
      </ErrorBoundry>
    );
  }
}
