import React, { Component } from 'react';
import BeerList from '../beer-list';
import CrafterbeerService from '../../service/crafterbeer-service'; 
import ErrorBoundry from '../error-boundry';
import Header from '../header';
import './app.css';

export default class App extends Component {

  state = {
    api: new CrafterbeerService(),
    filters: {styles: new Set(), breweries: new Set()}
  }

  styleButtonHandler = (styleId, isChecked) => {
    console.log(`${styleId} checked status: ${isChecked}`);
    if (isChecked) {
      this.setState((state) => {
        const newStyles = new Set(state.filters.styles);
        newStyles.add(styleId);
        return {...state, filters: {...state.filters, styles: newStyles }};
      })
    } else {
      this.setState((state) => {
        const newStyles = new Set(state.filters.styles);
        newStyles.delete(styleId);
        return {...state, filters: {...state.filters, styles: newStyles }};
      })
    }
  }

  breweryButtonHandler = (brewery, isChecked) => {
    console.log(`${brewery} checked status: ${isChecked}`);

    this.setState((state) => {
      const newBreweryFilter = new Set(state.filters.breweries);

      if (isChecked) {
        newBreweryFilter.add(brewery);
      } else {
        newBreweryFilter.delete(brewery);
      }

      return {...state, filters: {...state.filters, breweries: newBreweryFilter}}
    });
  }

  render() {
    const {api, filters} = this.state;
    return (
      <ErrorBoundry>
        <Header api={api} styleButtonHandler={this.styleButtonHandler} breweryButtonHandler={this.breweryButtonHandler} />
        <BeerList api={api} filters={filters} />
      </ErrorBoundry>
    );
  }
}
