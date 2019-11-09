import React from 'react';
import './header-info.css';
import { sortov } from '../../utils';

const HeaderInfo = ({beerCount, averageAlc}) => {
  return (
    <p className="header-info">
      <span className="header-info__count">
        Сегодня на кранах: <span className="header-info__digit">{beerCount}</span> {sortov(beerCount)}
      </span>
      <span className="header-info__average-alc">
        Средний градус алкоголя: <span className="header-info__digit">{averageAlc}%</span>
      </span>
    </p>
  )
}

export default HeaderInfo;