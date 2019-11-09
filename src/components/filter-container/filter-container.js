import React, { Component } from 'react';
import './filter-container.css';
import { PlusIcon } from '../icons';

export default class FilterContainer extends Component {
  state = {
    isOpened: false,
    element: null
  };

  hide = () => {
    this.setState({
      isOpened: false, 
      element: null
    });
    window.removeEventListener('click', this.outsideClickHandler);  
    window.removeEventListener('keydown', this.escHandler);
  }

  toggle = (element) => {
    
    if (element === null) {
      window.removeEventListener('click', this.outsideClickHandler);
      window.removeEventListener('keydown', this.escHandler);
    } else {
      setTimeout(() => window.addEventListener('click', this.outsideClickHandler), 0);
      window.addEventListener('keydown', this.escHandler);
    }
    
    this.setState((state) => {
      return {
        isOpened: !state.isOpened,
        element
      }
    });
  }
  
  outsideClickHandler = (e) => {
    const filterContainer = this.state.element.lastElementChild;
    const currentTarget = e.target;
    const outContains = !filterContainer.contains(currentTarget);
    const outEq = filterContainer !== currentTarget;
    
    if (outContains && outEq) {
      this.hide();
    }
  }
  
  escHandler = (e) => {
    if (e.keyCode === 27) {
      this.hide();
    }
  }
  
  buttonClickHandler = (e) => {
    const element = this.state.element === null ? e.target.parentNode : null; 
    this.toggle(element);
  }
  
  render() {
    const filter = this.state.isOpened ? this.props.children : null;
    const rotate = this.state.isOpened ? 45 : 0;
    return (
      <div className="filter-container">
        <button className="filter-container__button" onClick={this.buttonClickHandler}>
          {this.props.name}
          <PlusIcon rotate={rotate}/>
        </button>
        {filter}
      </div>
    );
  }
} 