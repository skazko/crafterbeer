import React from 'react';
import { connect } from 'react-redux';
import { clearFilters } from '../../actions';
import { filterBeers } from '../../utils';
import MobilePopupHeader from '../mobile-popup-header';
import './mobile-filters.css';

import AlcoFilter from '../alco-filter';
import StyleFilter from '../style-filter';
import BreweryFilter from '../brewery-filter';
import MobileFilterContainer from '../mobile-filter-container';

const MobileFilters = ({clearFilters, isOpen, closeHandler, filters, beers, appliedFilters, updateStyleFilter, updateAlcFilter, updateBreweryFilter, appliedAlc}) => {
  const openFilter = isOpen ? 'filter-popup_open' : '';
  const styles = [...filters.styles];  
  const breweries = [...filters.breweries];
  const { minAlc, maxAlc } = filters;
  const filteredQuantity = filterBeers(beers, appliedFilters).length;
  const isFiltered = filteredQuantity < beers.length;
  const confirmColors = isFiltered ? {'--confirm-bgcolor': '#217742', '--confirm-color': '#ffffff'} : {};
  const showClear = isFiltered ? {'--clear': 'block'} : {};
  return (
    <div className={`filter-popup ${openFilter}`}>
      <div className="filter-popup__content">
        <MobilePopupHeader 
          clearFilters={clearFilters} 
          showClear={showClear} 
          closeHandler={closeHandler} 
          popupName="Фильтр"
        />
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
      <button onClick={closeHandler} className="filter-popup__confirm" style={confirmColors}>Показать {filteredQuantity} сорт(ов)</button>
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