import React, { Component, Fragment } from 'react';
import BeerList from '../beer-list';
import Header from '../header';
import './app.css';
import { connect } from 'react-redux';
import { compose } from '../../utils';
import { beersFetch } from '../../actions';
import withCrafterbeerService from '../hoc/withCrafterbeerService';
import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner';


class App extends Component {

  styleButtonHandler = (styleId, isChecked) => {
    console.log(`${styleId} checked status: ${isChecked}`);
    if (isChecked) {
      this.setState((state) => {
        const newStyles = new Set(state.appliedFilters.styles);
        newStyles.add(styleId);
        return {...state, appliedFilters: {...state.appliedFilters, styles: newStyles }};
      })
    } else {
      this.setState((state) => {
        const newStyles = new Set(state.appliedFilters.styles);
        newStyles.delete(styleId);
        return {...state, appliedFilters: {...state.appliedFilters, styles: newStyles }};
      })
    }
  }

  breweryButtonHandler = (brewery, isChecked) => {
    console.log(`${brewery} checked status: ${isChecked}`);

    this.setState((state) => {
      const newBreweryFilter = new Set(state.appliedFilters.breweries);

      if (isChecked) {
        newBreweryFilter.add(brewery);
      } else {
        newBreweryFilter.delete(brewery);
      }

      return {...state, appliedFilters: {...state.appliedFilters, breweries: newBreweryFilter}}
    });
  }

  minHandler = (e) => {
    e.preventDefault();
    const currentMax = this.state.appliedFilters.maxAlcApplied;
    const newMin = parseFloat(e.target.value);
    const minAlcApplied = newMin > currentMax ? currentMax : newMin;
    this.setState((state) => ({...state, appliedFilters: {...state.appliedFilters, minAlcApplied} }))
  }

  maxHandler = (e) => {
    e.preventDefault();
    const currentMin = this.state.appliedFilters.minAlcApplied;
    const newMax = parseFloat(e.target.value);
    const maxAlcApplied = newMax < currentMin ? currentMin : newMax;
    this.setState((state) => ({...state, appliedFilters: {...state.appliedFilters, maxAlcApplied} }))
  }
 
  sliderTouchHandler = (e) => {
    const thumb = e.target;
    let touch;
    if (e.changedTouches.length === 1) {
      touch = e.changedTouches[0];
    }

    const shiftX = touch.clientX - thumb.getBoundingClientRect().left;
    const slider = document.getElementById('slider-alc');

    const thumbMoveHandler = (e) => {
      e.preventDefault();
      let newTouch;
      if (e.changedTouches.length === 1) {
        newTouch = e.changedTouches[0];
      }
      let newX = newTouch.clientX - shiftX - slider.getBoundingClientRect().left;
      if (newX < 0) {
        newX = 0;
      }

      const rightEdge = slider.offsetWidth - thumb.offsetWidth;
      if (newX > rightEdge) {
        newX = rightEdge;
      }

      thumb.style.left = newX + 'px';
      this.setState((state) => ({...state, appliedFilters: {...state.appliedFilters, minAlcApplied: newX} }));

    }
    document.addEventListener('touchmove', thumbMoveHandler);
    document.addEventListener('touchend', onTouchEnd);
  
    
  
    function onTouchEnd() {
      document.removeEventListener('touchend', onTouchEnd);
      document.removeEventListener('touchmove', thumbMoveHandler);
    }
  }

  sliderHandler = (e) => {
    e.preventDefault();
    const thumb = e.target;
    const shiftX = e.clientX - thumb.getBoundingClientRect().left;
    const slider = document.getElementById('slider-alc');

    const thumbMoveHandler = (e) => {
      let newX = e.clientX - shiftX - slider.getBoundingClientRect().left;
      if (newX < 0) {
        newX = 0;
      }
  
      const rightEdge = slider.offsetWidth - thumb.offsetWidth;
  
      if (newX > rightEdge) {
        newX = rightEdge;
      }
  
      thumb.style.left = newX + 'px';
      this.setState((state) => ({...state, appliedFilters: {...state.appliedFilters, minAlcApplied: newX} }))
      
    }


    document.addEventListener('mousemove', thumbMoveHandler);
    document.addEventListener('mouseup', onMouseUp);
  
    
  
    function onMouseUp() {
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mousemove', thumbMoveHandler);
    }
  }

  render() {
    
    return (
      <Fragment>
        <Header 
                styleButtonHandler={this.styleButtonHandler} 
                breweryButtonHandler={this.breweryButtonHandler} 
                sliderHandler={this.sliderHandler}
                sliderTouchHandler={this.sliderTouchHandler}
                minHandler={this.minHandler}
                maxHandler={this.maxHandler}
                />
        <BeerList />
      </Fragment>
        
    );
  }
}

class AppContainer extends Component {
  componentDidMount() {
    this.props.beersFetch();
  }
  render() {
    const { loading, error } = this.props;
    if (error) { return <ErrorIndicator /> }
    if (loading) { return <Spinner /> }

    return <App />
  }
}

const mapStateToProps = ({beerList: {beers, loading, error}}) => {
  return {beers, loading, error}
}
const mapDispatchToProps = (dispatch, { crafterbeerService }) => {
  return { beersFetch: beersFetch(crafterbeerService, dispatch)}
}

export default compose(
  withCrafterbeerService(),
  connect(mapStateToProps, mapDispatchToProps)
)(AppContainer);

