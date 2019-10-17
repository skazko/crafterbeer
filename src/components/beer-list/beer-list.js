import React from 'react';
import styled from 'styled-components';
import BeerItem from '../beer-item';


const BeerListStyled = styled.ul`
  list-style: none;
  margin: 0 auto;
  padding: 2px;
  display: flex;
  flex-wrap: wrap;
  max-width: 400px;

  @media (min-width: 800px) {
   max-width: 800px;
  }

  @media (min-width: 1200px) {
    max-width: 1200px;
  }
  @media (min-width: 1600px) {
    max-width: 1600px;
  }
`
const BeerList = ({ beers }) => {
  return (
    <BeerListStyled>
      {
        beers.map(beer => <BeerItem key={beer.id} beer={beer}/>)
      }
    </BeerListStyled>
  );
}

export default BeerList;
