import React from 'react';
import './bottle.scss';

const Bottle = ({ vol }) => {
  return (
    <div className="bottle">
      <div className="bottle__body">
        <div className="bottle__neck"></div>
        <div className="bottle__cap"></div>
        <div className="bottle__sticker">
          <span className="bottle__label">{vol}</span>
        </div>    
      </div>
    </div>
  );
};

export default Bottle;