import React from 'react';
import { connect } from 'react-redux';
import { updateStyleFilter, updateBreweryFilter, updateAlcFilter } from '../actions';
import { applyAlcFilter, applyBreweryFilter, applyStyleFilter } from './../utils';

import Header from './header';
import MobileHeader from './mobile-header/mobile-header';

const calculateQuantity = (filterMap, filter) => {
  let count;
  if (filterMap.has(filter)) {
    count = filterMap.get(filter).quantity;
  } else {
    count = 0;
  }
  count += 1;
  return count;
}

const beersToStyleFilter = (beers) => {
  const styles = new Map();
  beers.forEach(({style}) => {
    styles.set(style, {
      quantity: calculateQuantity(styles, style), 
      isChecked: false
    });
  });
  return styles;
}

const beersToBreweryFilter = (beers) => {
  const breweries = new Map();
  beers.forEach(({brewery, breweryImg}) => {
    breweries.set(brewery, {
      quantity: calculateQuantity(breweries, brewery), 
      img: breweryImg, 
      isChecked: false
    });
  });
  return breweries;
}

const calculateAvailableQuantity = (initial, available) => {
  const output = new Map(initial)
  for (let filter of output) {
    const [name, props] = filter;
    if (available.has(name)) {
      const {quantity} = available.get(name);
      output.set(name, {...props, quantity});
    } else {
      output.set(name, {...props, quantity: 0});
    }
  }
  return output;
}

const markCheckedFilters = (filters, filterName, appliedFilters) => {
  const output = new Map(filters);
  if (appliedFilters.needToApply.has(filterName)) {
    for (let filter of output.keys()) {
      if (appliedFilters[filterName].has(filter)) {
        const filterProp = output.get(filter);
        output.set(filter, {...filterProp, isChecked: true});
      }
    }
  }
  return output;
}

const HeaderContainer = ({ beers, updateStyleFilter, updateBreweryFilter, updateAlcFilter, appliedAlc, appliedFilters }) => {

  const beersAfterAlcFilter = applyAlcFilter(beers, appliedFilters);

  const initialStyles = beersToStyleFilter(beers);
  const availableStyles = beersToStyleFilter(applyBreweryFilter(beersAfterAlcFilter, appliedFilters));
  const stylesToMark = calculateAvailableQuantity(initialStyles, availableStyles);
  const styles = markCheckedFilters(stylesToMark, 'styles', appliedFilters);

  const initialBreweries = beersToBreweryFilter(beers);
  const availableBreweries = beersToBreweryFilter(applyStyleFilter(beersAfterAlcFilter, appliedFilters));
  const breweriesToMark = calculateAvailableQuantity(initialBreweries, availableBreweries);
  const breweries = markCheckedFilters(breweriesToMark, 'breweries', appliedFilters);
  
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
      
  return (
    <div className="header">
      <Header filters={filters} updateStyleFilter={updateStyleFilter} 
            updateBreweryFilter={updateBreweryFilter} updateAlcFilter={updateAlcFilter}
            appliedAlc = {appliedAlc} />
      <MobileHeader filters={filters} updateStyleFilter={updateStyleFilter} 
            updateBreweryFilter={updateBreweryFilter} updateAlcFilter={updateAlcFilter}
            appliedAlc = {appliedAlc}/>
    </div>
  );
}

const mapStateToProps = ({beerList: {beers}, appliedFilters}) => {
  return { beers, appliedAlc: {max: appliedFilters.maxAlc, min: appliedFilters.minAlc}, appliedFilters }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateStyleFilter: (style, isChecked) => dispatch(updateStyleFilter(style, isChecked)),
    updateBreweryFilter: (brewery, isChecked) => dispatch(updateBreweryFilter(brewery, isChecked)),
    updateAlcFilter: (maxAlc, minAlc) => dispatch(updateAlcFilter(maxAlc, minAlc))      
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);