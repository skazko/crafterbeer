import React, { Component } from 'react';
import BeerList from '../beer-list';
import CrafterbeerService from '../../service/crafterbeer-service'; 
import ErrorBoundry from '../error-boundry';
import Header from '../header';
import './app.css';

export default class App extends Component {

  state = {
    api: new CrafterbeerService(),
    filters: {styles: ['IPA']}
  }

  render() {
    const {api, filters} = this.state;
    return (
      <ErrorBoundry>
        <Header api={api} />
        <BeerList api={api} filters={filters} />
      </ErrorBoundry>
    );
  }
}
