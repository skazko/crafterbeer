import React from 'react';
import { connect } from 'react-redux';
import { updateStyleFilter, updateBreweryFilter, updateAlcFilter } from '../actions';
import FilterMap from '../utils/filter-map';
import Header from './header';
import MobileHeader from './mobile-header/mobile-header';

const HeaderContainer = ({ beers, updateStyleFilter, updateBreweryFilter, updateAlcFilter, appliedAlc, appliedFilters }) => {

  const filterMap = new FilterMap(beers, appliedFilters);
      
  return (
    <div className="header">
      <Header filters={filterMap} updateStyleFilter={updateStyleFilter} 
            updateBreweryFilter={updateBreweryFilter} updateAlcFilter={updateAlcFilter}
            appliedAlc = {appliedAlc} />
      <MobileHeader filters={filterMap} updateStyleFilter={updateStyleFilter} 
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