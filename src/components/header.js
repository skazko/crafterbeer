import React from 'react';
import styled from 'styled-components';

import AlcoFilter from './alco-filter';
import FilterContainer from './filter-container';
import StyleFilter from './style-filter';
import BreweryFilter from './brewery-filter';

const HeaderStyled = styled.header`
  width: 100%;
`;

const HeaderLogo = styled.img``;
const HeaderFilters = styled.ul`
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 20px;
  list-style: none;
`;

const HeaderFilter = styled.li`
  margin-bottom: 20px;
`;

const FilterWrapper = styled.div`
  position: absolute;
  top: 130%;
  width: 20rem;
  background-color: #ffffff;
  z-index: 10;
  border: 1px solid #000000;
  border-radius: 3px;
  padding: 1rem;
`;

const Header = ({ filters, updateStyleFilter, updateBreweryFilter, updateAlcFilter, appliedAlc }) => {
  const styles = [...filters.styles];  
  const breweries = [...filters.breweries];
  const { minAlc, maxAlc } = filters;

  return (
    <HeaderStyled>
      <HeaderLogo></HeaderLogo>
      <HeaderFilters>
        <HeaderFilter>
          <FilterContainer name="Алкоголь">
            <FilterWrapper>
              <AlcoFilter maxAlc={maxAlc} minAlc={minAlc} updateAlcFilter={updateAlcFilter} appliedAlc={appliedAlc}/>
            </FilterWrapper>
          </FilterContainer>
        </HeaderFilter>
        <HeaderFilter id="style-filter" >
          <FilterContainer name="Стили">
            <FilterWrapper>
              <StyleFilter styles={styles} updateStyleFilter={updateStyleFilter}/>
            </FilterWrapper>
          </FilterContainer>
        </HeaderFilter>
        <HeaderFilter id="brewery-filter" >
          <FilterContainer name="Пивоварни">
            <FilterWrapper>
              <BreweryFilter breweries={breweries} updateBreweryFilter={updateBreweryFilter}/>
            </FilterWrapper>
          </FilterContainer>
        </HeaderFilter>
      </HeaderFilters>
    </HeaderStyled>
  );
}

export default Header;