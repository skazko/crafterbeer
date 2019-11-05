import React from 'react';
import MobilePopupHeader from '../mobile-popup-header';
import './mobile-sort-popup.css';
import BeerSortOption from '../beer-sort-option';
import {
  AscIcon, 
  DescIcon,
  ABAscIcon,
  ABDescIcon
} from '../icons';


const MobileSortPopup = ({isOpen, closeHandler}) => {

  const openClass = isOpen ? 'mobile-sort-popup_open' : '';

  return (
    <div className={`mobile-sort-popup ${openClass}`}>
      <MobilePopupHeader 
          closeHandler={closeHandler} 
          popupName="Сортировать по:"
        />
      <BeerSortOption icon={<AscIcon />} closeHandler={closeHandler} sortOption={'alcoAsc'} label="Алкоголь: от легкого к крепкому"></BeerSortOption>
      <BeerSortOption icon={<DescIcon />} closeHandler={closeHandler} sortOption={'alcoDesc'} label="Алкоголь: от крепкого к легкому"></BeerSortOption>
      <BeerSortOption icon={<ABDescIcon />} closeHandler={closeHandler} sortOption={'breweryDesc'} label="Пивоварня: по убыванию"></BeerSortOption>
      <BeerSortOption icon={<ABAscIcon />} closeHandler={closeHandler} sortOption={'breweryAsc'} label="Пивоварня: по возрастанию"></BeerSortOption>
    </div>
  );
}

export default MobileSortPopup;