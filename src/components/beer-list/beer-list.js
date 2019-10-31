import React from 'react';
import styled from 'styled-components';
import BeerItem from '../beer-item';
import { connect } from 'react-redux';
import { filterBeers } from '../../utils';

const BeerListStyled = styled.ul`
  list-style: none;
  margin: 0 auto;
  padding: 2px;
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  max-width: 400px;
  /* background-color: #f3d654; */
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
        beers.map((beer) => <BeerItem key={beer.id} beer={beer}/>)
      }
    </BeerListStyled>
  );
}

const BeerListContainer = ({beers, appliedFilters}) => {

    return <BeerList beers={
      filterBeers(beers, appliedFilters)
        .sort((beer1, beer2) => beer1.brewery > beer2.brewery ? 1 : beer1.brewery === beer2.brewery ? 0 : -1)
    } />

}

const mapStateToProps = ({beerList: {beers}, appliedFilters}) => {
  return {beers, appliedFilters}
}

// const mapDispatchToProps = (dispatch, { crafterbeerService }) => {
//   return {
//     beersFetch: beersFetch(crafterbeerService, dispatch),
//   }
// };


export default connect(mapStateToProps)(BeerListContainer);