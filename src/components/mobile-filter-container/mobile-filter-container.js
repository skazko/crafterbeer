import React, { Component } from 'react';
import './mobile-filter-container.css';
import { PlusIcon } from '../icons';

export default class MobileFilterContainer extends Component {
  state = {
    opened: false
  }

  toggle = () => {
    this.setState((prevState) => {
      return {
        opened: !prevState.opened
      }
    });
  }
  
  render() {
    const { name, children } = this.props;
    const output = this.state.opened ? children : null;
    const btnColor = this.state.opened ? '#eeeeee' : 'transparent';
    const containerPadding = this.state.opened ? '1rem 1rem 2rem 1rem' : '0';
    const rotate = this.state.opened ? 45 : 0;
    return (
      <div className="filter-container-mobile">
        <button onClick={this.toggle} className="filter-container-mobile__btn" style={{backgroundColor: btnColor}}>
          <PlusIcon rotate={rotate} />
          <span className="filter-container-mobile__name">{name}</span>
        </button>
        <div className="filter-container-mobile__content" style={{padding: containerPadding}}>
          {output}
        </div>
      </div>
    );
  }
}