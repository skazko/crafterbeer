import React, { Component } from 'react';
import { connect } from 'react-redux';
import { clearFilters } from '../../actions';
import { filterBeers } from '../../utils';

import './mobile-filters.css';

import AlcoFilter from '../alco-filter';
import StyleFilter from '../style-filter';
import BreweryFilter from '../brewery-filter';
import MobileFilterContainer from '../mobile-filter-container';

const MobileFilters = ({clearFilters, isOpen, closeHandler, filters, beers, appliedFilters, updateStyleFilter, updateAlcFilter, updateBreweryFilter, appliedAlc}) => {
  const openMod = isOpen ? 'filter-popup_open' : '';
  const styles = [...filters.styles];  
  const breweries = [...filters.breweries];
  const { minAlc, maxAlc } = filters;
  const filteredQuantity = filterBeers(beers, appliedFilters).length;
  const isFiltered = filteredQuantity < beers.length;
  const confirmColor = isFiltered ? {backgroundColor: '#217742', color: '#ffffff'} : {};
  return (
    <div className={`filter-popup ${openMod}`}>
      <div className="filter-popup__content">
        <div className="filter-popup__header">
          <h3 className="filter-popup__title">Фильтр</h3>
          <button onClick={clearFilters} className="filter-popup__clear-filter">Очистить фильтр</button>
          <button onClick={closeHandler} className="filter-popup__close">&times;</button>
        </div>
        <div className="filter-popup__filters-container">
          <MobileFilterContainer name="Алкоголь">
            <AlcoFilter maxAlc={maxAlc} minAlc={minAlc} updateAlcFilter={updateAlcFilter} appliedAlc={appliedAlc}/>
          </MobileFilterContainer>
          <MobileFilterContainer name="Пивоварни">
            <BreweryFilter breweries={breweries} updateBreweryFilter={updateBreweryFilter}/>
          </MobileFilterContainer>
          <MobileFilterContainer name="Стили">
            <StyleFilter styles={styles} updateStyleFilter={updateStyleFilter}/>
          </MobileFilterContainer>
        </div>
      </div>
      <button onClick={closeHandler} className="filter-popup__confirm" style={confirmColor}>Показать {filteredQuantity} сорт(ов)</button>
    </div>
  );
}

const mapStateToProps = ({beerList: {beers}, appliedFilters}) => {
  return { beers, appliedAlc: {max: appliedFilters.maxAlc, min: appliedFilters.minAlc}, appliedFilters }
}

const mapDispatchToProps = (dispatch) => {
  return {
    clearFilters: () => dispatch(clearFilters())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MobileFilters);