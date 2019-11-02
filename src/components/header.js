import React from 'react';
import styled from 'styled-components';

import AlcoFilter from './alco-filter';
import FilterContainer from './filter-container';
import StyleFilter from './style-filter';
import BreweryFilter from './brewery-filter';

const HeaderFilters = styled.ul`
  
  display: none;
  
  
  @media (min-width: 768px) {
    margin: 0;
    padding: 20px;
    list-style: none;
    display: flex;
    flex-direction: row;
    justify-content: center;
  }
`;

const HeaderFilter = styled.li`
  margin-bottom: 20px;
`;

const FilterWrapper = styled.div`
  @media (min-width: 768px) {
    position: absolute;
    top: 130%;
    width: 20rem;
    background-color: #ffffff;
    z-index: 10;
    border: 1px solid #000000;
    border-radius: 3px;
    padding: 1rem;
  }
  
`;

const Header = ({ filters, updateStyleFilter, updateBreweryFilter, updateAlcFilter, appliedAlc }) => {
  const styles = [...filters.styles];  
  const breweries = [...filters.breweries];
  const { minAlc, maxAlc } = filters;

  return (
    <HeaderFilters>
      <HeaderFilter>
        <FilterContainer name="Алкоголь">
          <FilterWrapper>
            <AlcoFilter maxAlc={maxAlc} minAlc={minAlc} updateAlcFilter={updateAlcFilter} appliedAlc={appliedAlc}/>
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
      <HeaderFilter id="style-filter" >
        <FilterContainer name="Стили">
          <FilterWrapper>
            <StyleFilter styles={styles} updateStyleFilter={updateStyleFilter}/>
          </FilterWrapper>
        </FilterContainer>
      </HeaderFilter>
    </HeaderFilters>
  );
}

export default Header;