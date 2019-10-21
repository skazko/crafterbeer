import React from 'react';
import styled from 'styled-components';
import BeerItem from '../beer-item';
import withBeer from '../hoc/withBeer';


const BeerListStyled = styled.ul`
  list-style: none;
  margin: 0 auto;
  padding: 2px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  max-width: 400px;
  background-color: #f3d654;
  @media (min-width: 800px) {
   max-width: 800px;
  }

  @media (min-width: 1198px) {
    max-width: 1198px;
  }

  @media (min-width: 1596px) {
    max-width: 1596px;
  }
`

// const filterBeer = (beers, filters) => {

// }
const BeerList = ({ beers, filters }) => {
  return (
    <BeerListStyled>
      {
        beers
          .filter((beer) => !filters.styles.has(beer.style))
          .filter((beer) => !filters.breweries.has(beer.brewery))
          .sort((beer1, beer2) => beer1.brewery > beer2.brewery ? 1 : beer1.brewery === beer2.brewery ? 0 : -1)
          .map((beer) => <BeerItem key={beer.id} beer={beer}/>)
      }
    </BeerListStyled>
  );
}

export default withBeer(BeerList);
