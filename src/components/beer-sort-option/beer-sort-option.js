import React from 'react';
import { connect } from 'react-redux';
import { sortBeersHandler } from '../../actions';
import './beer-sort-option.css';

const BeerSortOption = ({icon, sortOption, label, closeHandler, sortBeersHandler}) => {
  const radioChangeHandler = (e) => {
    sortBeersHandler(e);
    closeHandler();
  }
  return (
    <div className="beer-sort-option">
      {icon}
      <input 
        className="beer-sort-option__input"
        id={sortOption} 
        type="radio" 
        name="sortOption" 
        value={sortOption} 
        onChange={radioChangeHandler} />
      <label 
        className="beer-sort-option__button"
        htmlFor={sortOption} >{label}
      </label>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    sortBeersHandler: (e) => dispatch(sortBeersHandler(e.target.value))
  }
}

export default connect(null, mapDispatchToProps)(BeerSortOption);