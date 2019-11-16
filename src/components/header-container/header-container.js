import React from 'react';
import { connect } from 'react-redux';
import { updateStyleFilter, updateBreweryFilter, updateAlcFilter } from '../../actions';
import FilterMap from '../../utils/filter-map';
import Header from '../header';
import MobileHeader from '../mobile-header/mobile-header';
import HeaderInfo from '../header-info';
import Logo from '../logo';
import './header-container.css';

function getAverageAlc(beers) {
  return Math.round(beers.reduce((alcSum, beer) => {
    return alcSum + beer.alc;
  }, 0) * 10 / beers.length ) / 10;
}

const HeaderContainer = ({ beers, updateStyleFilter, updateBreweryFilter, updateAlcFilter, appliedAlc, appliedFilters }) => {

  const filterMap = new FilterMap(beers, appliedFilters);
      
  return (
    <div className="header-container">
      <div className="header__top-line">
        <Logo size="52" />
        <HeaderInfo beerCount={beers.length} averageAlc={getAverageAlc(beers)} />
      </div>
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