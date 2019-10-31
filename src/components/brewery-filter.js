import React from 'react';
import styled from 'styled-components';
import { FilterButton, FilterCheckbox, FilterList } from './filter-styled';

const crafterbeerLogo = "https://crafterbeer.ru/wp-content/uploads/2019/02/logo-crafter-small-1.png";

const BreweryListItem = styled.li`
  margin: 0 -1rem;
`;

const BreweryName = styled.span`
  margin-left: 10px;
  flex-grow: 1;
`;

const BreweryBeersQuantity = styled.span`
`;

const BreweryLabel = styled(FilterButton)`
  display: flex;
  align-items: center;
  padding: 5px 1.5rem;
  border-width: 0;
  margin: 0;

  &::before {
    content: "";
    flex-shrink: 0;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    overflow: hidden;
    background-size: contain;
    background-repeat: no-repeat;
    background-position: center center;
    background-image: url('${props => props.breweryImg || crafterbeerLogo }');
  }
`;

const BreweryCheckbox = styled(FilterCheckbox)`
  :checked + label {
    background-color: #d5d5d5;
  }

  & + label:hover {
    background-color: #c5c5c5;
  }

  :disabled + label {
    opacity: 0.3;
  }
`;

const BreweryFilter = ({ breweries, updateBreweryFilter }) => {

  const breweriesItems = breweries.map((brewery) => {
    
    const [name, props] = brewery;
    const { isChecked, quantity, img } = props; 
    const id = `${name.replace(/[\s'"`-]/g, '')}Filter`; 

    return (
      <BreweryListItem key={name}>
        <BreweryCheckbox 
          onChange={(e) => updateBreweryFilter(name, e.target.checked)}
          id={id} 
          type="checkbox"
          checked={isChecked} 
          disabled={quantity === 0}/>
        <BreweryLabel htmlFor={id} breweryImg={img} >
          <BreweryName>{name}</BreweryName>
          <BreweryBeersQuantity>{quantity}</BreweryBeersQuantity>
        </BreweryLabel>
      </BreweryListItem>
    )
  });

  return <FilterList>{breweriesItems}</FilterList>;
}

export default BreweryFilter;