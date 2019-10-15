import React from 'react';
import './beer-item.css';

const BeerItem = ({ item }) => {
  const {id, imgSrc, imgAlt, name, description, tth} = item;
  return (
    <li className="beer-item" key={id}>
      <div className="beer-item__image">
        <img className="beer-image" src={imgSrc} alt={imgAlt} />
      </div>
      <div className="beer-item__information">
        <h3 className="beer-item__title">{name}</h3>
        <p className="beer-item__description">{description}</p> 
        <h4>Характеристики:</h4>
        <table className="beer-item__features">
          <tbody>
            {
              tth.map(({ name, value }) => {
                return (
                  <tr className="beer-item__feature" key={id + name + value}>
                    <td className="beer-item__features-term">{name}</td>
                    <td className="beer-item__features-value">{value}</td>
                  </tr>
                );
              })
            }
          </tbody>
          
        </table>
      </div>
    </li>
  );
};

export default BeerItem;