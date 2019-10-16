import React from 'react';
import Bottle from '../bottle';
import './beer-item.scss';

const BeerItem = ({ item }) => {
  const {id, imgSrc, imgAlt, features, style, price} = item;
  return (
    <li className="beer-item" key={id}>
      <div className="beer-item__image">
        <img className="beer-image" src={imgSrc} alt={imgAlt} />
      </div>
      <div className="beer-item__information">
        <ul className="beer-item__features">
            {
              features.map(({ name, value }) => {
                return (
                  <li className="beer-item__feature-wrapper" key={id + name + value}>
                    <div className={`beer-item__feature beer-item__feature_${name}`}>
                      {value}
                    </div>
                  </li>
                );
              })
            }
        </ul>
        {/* <p className="beer-item__style">{style}</p> */}
        <div className="beer-item__price">
          <Bottle vol="1л" />
          <span className="beer-item__price-value">{price}р</span>
        </div>
        {/* <ul className="beer-item__price">
          <li className="beer-item__full-price">{price}р</li>
          <li className="beer-item__half-price">{price / 2 + 10}р</li>
        </ul> */}
      </div>
    </li>
  );
};

export default BeerItem;