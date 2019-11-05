import React from 'react';
import { CloseIcon } from '../icons';
import './mobile-popup-header.css';

const MobilePopupHeader = ({ clearFilters, showClear, popupName, closeHandler }) => {
  return (
    <div className="filter-popup__header">
      <h3 className="filter-popup__title">{popupName}</h3>
      <button style={showClear} onClick={clearFilters} className="filter-popup__clear-filter">Очистить фильтр</button>
      <button onClick={closeHandler} className="filter-popup__close"><CloseIcon /></button>
    </div>
  );
}

export default MobilePopupHeader;