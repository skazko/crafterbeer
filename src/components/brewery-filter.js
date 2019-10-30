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
  padding: 10px;
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
    background-color: #f5f5f5;
  }

  & + label:hover {
    background-color: #d5d5d5;
  }

  :checked + label:hover {
    background-color: #d5d5d5;
  }
`;

const BreweryFilter = ({ breweries, updateBreweryFilter }) => {

  const breweriesItems = breweries.map((brewery) => (
    <BreweryListItem key={brewery[0]}>
      <BreweryCheckbox 
        onChange={(e) => updateBreweryFilter(brewery[0], e.target.checked)}
        id={`${brewery[0].replace(/[\s'"`-]/g, '')}Filter`} 
        type="checkbox" />
      <BreweryLabel htmlFor={`${brewery[0].replace(/[\s'"`-]/g, '')}Filter`} breweryImg={brewery[1].img} >
        <BreweryName>{brewery[0]}</BreweryName>
        <BreweryBeersQuantity>{brewery[1].quantity}</BreweryBeersQuantity>
      </BreweryLabel>
    </BreweryListItem>
  ) );

  return <FilterList>{breweriesItems}</FilterList>;
}

export default BreweryFilter;