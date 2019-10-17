import React from 'react';
import styled from 'styled-components';
import BeerItem from '../beer-item';


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
