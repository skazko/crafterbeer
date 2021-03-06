import React from 'react';
import Bottle from '../bottle';
import { beergroundColor } from '../../utils';
import './beer-item.scss';

function makeFeatures(beer) {
  const features = [];
  if (beer.alc) {
    features.push({name: 'abv', value: beer.alc});
  }
  if (beer.og) {
    features.push({name: 'og', value: beer.og});
  }
  if (beer.ibu) {
    features.push({name: 'ibu', value: beer.ibu});
  }
  return features;
}

const BeerItem = ({ beer }) => {
  const {id, imgSrc, imgAlt, style, price} = beer;
  const { backColor, frontColor, shadowString } = beergroundColor(style);
  const features = makeFeatures(beer);

  return (
    <li className="beer-item">
      <div className="beer-item__main" style={{backgroundColor: backColor}}>
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
        <div className="beer-item__price">
          <Bottle vol="1л" />
          <span className="beer-item__price-value" style={{color: frontColor, textShadow: shadowString}}>{price}р</span>
        </div>
      </div>
      </div>
      <div className="beer-item__style">{style}</div>
    </li>
    
  );
};

export default BeerItem;