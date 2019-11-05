import React, { Component } from 'react';
import MobileFilters from '../mobile-filters';
import { FilterIcon, SortIcon } from '../icons';

import './mobile-header.css';
import MobileSortPopup from '../mobile-sort-popup';

class MobileHeader extends Component {
  
  state = {
    filtersOpened: false,
    sortOpened: false
  }

  toggleSortPopup = () => {
    this.setState((prevState) => {
      if (prevState.sortOpened) {
        document.body.style.overflow = 'auto';
      } else {
        document.body.style.overflow = 'hidden';
      }

      return {
        sortOpened: !prevState.sortOpened
      }
    });
  }

  toggleFilter = () => {
    this.setState((prevState) => {
      if (prevState.filtersOpened) {
        document.body.style.overflow = 'auto';
      } else {
        document.body.style.overflow = 'hidden';
      }

      return {
        filtersOpened: !prevState.filtersOpened
      }
    });
  }
  
  render() {
    const { filtersOpened, sortOpened } = this.state;
    const { filters, updateStyleFilter, updateAlcFilter, updateBreweryFilter, appliedAlc } = this.props;
    return (
      <div className="mobile-header">
        <div className="mobile-header__buttons">
          <button className="mobile-header__btn" onClick={this.toggleFilter}>
            <span className="mobile-header__btn-title">Фильтр</span>
            <FilterIcon />
          </button>
          <button className="mobile-header__btn" onClick={this.toggleSortPopup}>
            <span className="mobile-header__btn-title">Сортировка</span>
            <SortIcon />
          </button>
        </div>
        
        <MobileFilters isOpen={filtersOpened} closeHandler={this.toggleFilter}
        filters={filters} updateStyleFilter={updateStyleFilter} 
        updateBreweryFilter={updateBreweryFilter} updateAlcFilter={updateAlcFilter}
        appliedAlc = {appliedAlc}/>
        <MobileSortPopup isOpen={sortOpened} closeHandler={this.toggleSortPopup}/>
      </div>
    );
  }
}

export default MobileHeader;