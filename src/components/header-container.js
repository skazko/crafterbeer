import React from 'react';
import { connect } from 'react-redux';
import { updateStyleFilter, updateBreweryFilter, updateAlcFilter } from '../actions';

import Header from './header';

const HeaderContainer = ({ beers, updateStyleFilter, updateBreweryFilter, updateAlcFilter, appliedAlc }) => {

  const styles = new Map();
  beers.forEach((beer) => {
    let quantity = styles.get(beer.style);
    if (quantity === undefined) {
      quantity = 0;
    }
    quantity += 1;
    styles.set(beer.style, quantity);
  });

  const breweries = new Map();
  beers.forEach((beer) => {
    let quantity;
    let value = breweries.get(beer.brewery);
    if (value === undefined) {
      quantity = 0;
    } else {
      quantity = value.quantity;
    }
    quantity += 1;
    breweries.set(beer.brewery, {quantity, img: beer.breweryImg});
  });
  
  const minAlc = beers.reduce((min, beer) => {
    const alc = beer.features.find(feature => feature.name === 'abv');
    return alc.value < min ? alc.value : min;
  }, 100);

  const maxAlc = beers.reduce((max, beer) => {
    const alc = beer.features.find(feature => feature.name === 'abv');
    return alc.value > max ? alc.value : max;
  }, 0);
  
  const filters = {
    styles,
    breweries,
    minAlc,
    maxAlc
  };
      
  return <Header filters={filters} 
                 updateStyleFilter={updateStyleFilter} 
                 updateBreweryFilter={updateBreweryFilter}
                 updateAlcFilter={updateAlcFilter}
                 appliedAlc = {appliedAlc}/>;
}

const mapStateToProps = ({beerList: {beers}, appliedFilters: {maxAlc, minAlc}}) => {
  return { beers, appliedAlc: {max: maxAlc, min: minAlc} }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateStyleFilter: (style, isChecked) => dispatch(updateStyleFilter(style, isChecked)),
    updateBreweryFilter: (brewery, isChecked) => dispatch(updateBreweryFilter(brewery, isChecked)),
    updateAlcFilter: (maxAlc, minAlc) => dispatch(updateAlcFilter(maxAlc, minAlc))      
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);