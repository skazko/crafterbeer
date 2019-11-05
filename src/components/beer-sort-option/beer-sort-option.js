import React from 'react';
import { connect } from 'react-redux';
import { sortBeersHandler } from '../../actions';
import './beer-sort-option.css';

const BeerSortOption = ({icon, sortOption, label, closeHandler, sortBeersHandler, currentSortingOption}) => {

  const currentOptionColor = sortOption === currentSortingOption ? {'--current-sorting-option-color': '#eeeeee'} : {};
  return (
    <div
      style={currentOptionColor} 
      className="beer-sort-option">
      {icon}
      <input 
        className="beer-sort-option__input"
        checked={sortOption === currentSortingOption}
        id={sortOption} 
        type="radio" 
        name="sortOption"
        value={sortOption} 
        onChange={sortBeersHandler}
        onClick={closeHandler} />
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

const mapStateToProps = ({ sortingOption }) => {
  return {
    currentSortingOption: sortingOption
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(BeerSortOption);