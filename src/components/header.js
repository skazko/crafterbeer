import React, { Fragment } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { updateStyleFilter, updateBreweryFilter,
  updateAlcFilter } from '../actions';

import AlcoFilter from './alco-filter';

const HeaderStyled = styled.header`
  width: 100%;`;

const HeaderLogo = styled.img``;
const HeaderFilters = styled.ul`

  margin: 0;
  padding: 20px;
  list-style: none;`;

const HeaderFilter = styled.li`
margin-bottom: 20px;`;

const FilterCheckbox = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  clip: rect(0 0 0 0);
  overflow: hidden;

  :checked + label {
    background-color: yellow;
  }

  :focus + label {
    outline: rgb(59, 153, 252) auto 5px;
  }`;

const BreweryCheckbox = styled(FilterCheckbox)`
  :checked + label {
    background-color: #f5f5f5;
  }`;

const FilterButton = styled.label`
  padding: 5px;
  cursor: pointer;
  border: 1px solid grey;
  display: inline-block;
  margin: 0 10px 10px 0;`;

const crafterbeerLogo = "https://crafterbeer.ru/wp-content/uploads/2019/02/logo-crafter-small-1.png";

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
  }`;

const BreweryName = styled.span`
  margin-left: 10px;
  flex-grow: 1;`;

const BreweryBeersQuantity = styled.span``;

const Header = ({ filters, updateStyleFilter, updateBreweryFilter, updateAlcFilter }) => {
  const styles = [...filters.styles];  
  const breweries = [...filters.breweries];
  const { minAlc, maxAlc } = filters;

  return (
    <HeaderStyled>
      <HeaderLogo></HeaderLogo>
      <HeaderFilters>
        <HeaderFilter>
          <AlcoFilter maxAlc={maxAlc} minAlc={minAlc} updateAlcFilter={updateAlcFilter}/>
        </HeaderFilter>

        <HeaderFilter id="style-filter" >
          {
            styles.map((style) => (
              <Fragment key={style[0]}>
                <FilterCheckbox
                  onChange={(e) => updateStyleFilter(style[0], e.target.checked)} 
                  id={`${style[0].replace(/\s/g, '')}Filter`} 
                  type="checkbox" />
                  

                <FilterButton htmlFor={`${style[0].replace(/\s/g, '')}Filter`}>{style[0]}<span> - {style[1]}</span></FilterButton>
              </Fragment>
              
            ) )
          }
        </HeaderFilter>
        <HeaderFilter id="brewery-filter" >
          {
            breweries.map((brewery) => (
              <Fragment key={brewery[0]}>
                <BreweryCheckbox 
                  onChange={(e) => updateBreweryFilter(brewery[0], e.target.checked)}
                  id={`${brewery[0].replace(/[\s'"`-]/g, '')}Filter`} 
                  type="checkbox" />
                <BreweryLabel htmlFor={`${brewery[0].replace(/[\s'"`-]/g, '')}Filter`} breweryImg={brewery[1].img} >
                  <BreweryName>{brewery[0]}</BreweryName>
                  <BreweryBeersQuantity>{brewery[1].quantity}</BreweryBeersQuantity>
                </BreweryLabel>
              </Fragment>
            ) )
          }
        </HeaderFilter>
        
      </HeaderFilters>
    </HeaderStyled>
  );
}

const HeaderContainer = ({ beers, updateStyleFilter, updateBreweryFilter, updateAlcFilter }) => {

  const styles = new Map();
  beers.forEach((beer) => {
    let quantity = styles.get(beer.style);
    if (quantity === undefined) {
      quantity = 0;
    }
    quantity += 1;
    styles.set(beer.style, quantity);
  });

  const breweries = new Map();
  beers.forEach((beer) => {
    let quantity;
    let value = breweries.get(beer.brewery);
    if (value === undefined) {
      quantity = 0;
    } else {
      quantity = value.quantity;
    }
    quantity += 1;
    breweries.set(beer.brewery, {quantity, img: beer.breweryImg});
  });
  
  const minAlc = beers.reduce((min, beer) => {
    const alc = beer.features.find(feature => feature.name === 'abv');
    return alc.value < min ? alc.value : min;
  }, 100);

  const maxAlc = beers.reduce((max, beer) => {
    const alc = beer.features.find(feature => feature.name === 'abv');
    return alc.value > max ? alc.value : max;
  }, 0);

  const filters = {
    styles,
    breweries,
    minAlc,
    maxAlc
  };
      
  return <Header filters={filters} 
                 updateStyleFilter={updateStyleFilter} 
                 updateBreweryFilter={updateBreweryFilter}
                 updateAlcFilter={updateAlcFilter}/>;
}

const mapStateToProps = ({beerList: {beers}}) => {
  return { beers }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateStyleFilter: (style, isChecked) => dispatch(updateStyleFilter(style, isChecked)),
    updateBreweryFilter: (brewery, isChecked) => dispatch(updateBreweryFilter(brewery, isChecked)),
    updateAlcFilter: (maxAlc, minAlc) => dispatch(updateAlcFilter(maxAlc, minAlc))      
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);