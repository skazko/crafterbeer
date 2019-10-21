import React, { Fragment } from 'react';
import styled from 'styled-components';
import withFilters from './hoc/withFilters';

const HeaderContainer = styled.header``;
const HeaderLogo = styled.img``;
const HeaderFilters = styled.ul``;
const HeaderFilter = styled.li``;
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
  }
  `;

const BreweryCheckbox = styled(FilterCheckbox)`
  :checked + label {
    background-color: inherit;
    border: red solid 3px;
  }
`;

const FilterButton = styled.label`
  padding: 5px;
  cursor: pointer;
  border: 1px solid grey;
  display: inline-block;
  margin: 0 10px 10px 0;
`;

const BreweryButton = styled(FilterButton)`
  padding: 0;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center center;
  background-image: url('${props => props.breweryImg || "https://crafterbeer.ru/wp-content/uploads/2019/02/logo-crafter-small-1.png" }');
  /* &::after {
    content: "${props => props.name}";
  } */
`;

const FilterSlider = styled.input.attrs(props => ({
  type: "range",
  min: props.min,
  max: props.max,
  
}))


const Header = ({ filters, styleButtonHandler, breweryButtonHandler }) => {

  const styles = [...filters.styles];  
  const breweries = [...filters.breweries];

  return (
    <HeaderContainer>
      <HeaderLogo></HeaderLogo>
      <HeaderFilters>
        <HeaderFilter id="style-filter">
          {
            styles.map((style) => (
              <Fragment key={style}>
                <FilterCheckbox 
                  id={`${style.replace(/\s/g, '')}Checked`} 
                  type="checkbox" 
                  onChange={(e) => {styleButtonHandler(style, e.target.checked)}} />

                <FilterButton htmlFor={`${style.replace(/\s/g, '')}Checked`}>{style}</FilterButton>
              </Fragment>
              
            ) )
          }
        </HeaderFilter>
        <HeaderFilter id="brewery-filter">
          {
            breweries.map((brewery) => (
              <Fragment key={brewery[0]}>
                <BreweryCheckbox 
                  id={`${brewery[0].replace(/[\s'"`-]/g, '')}Filter`} 
                  type="checkbox" 
                  onChange={(e) => {breweryButtonHandler(brewery[0], e.target.checked)}} />

                <BreweryButton htmlFor={`${brewery[0].replace(/[\s'"`-]/g, '')}Filter`} breweryImg={brewery[1]} name={brewery[0]}></BreweryButton>
              </Fragment>
              
            ) )
          }
        </HeaderFilter>
        
        <HeaderFilter>

        </HeaderFilter>
      </HeaderFilters>
    </HeaderContainer>
  );
}

export default withFilters(Header);