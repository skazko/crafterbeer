import React, { Fragment } from 'react';
import styled from 'styled-components';
import withFilters from './hoc/withFilters';

const HeaderContainer = styled.header``;
const HeaderLogo = styled.img``;
const HeaderFilters = styled.ul``;
const HeaderFilter = styled.li``;
const FilterCheckbox = styled.input``;
const FilterButton = styled.label``;


const Header = ({ filters }) => {

  const styles = [...filters.styles];

  return (
    <HeaderContainer>
      <HeaderLogo></HeaderLogo>
      <HeaderFilters>
        <HeaderFilter id="styles">
          {
            styles.map((s) => (
              <Fragment key={s}>
                <FilterCheckbox id={`${s}Checked`} type="checkbox" onChange={(e) => {console.log(e.target.checked)}} />
                <FilterButton htmlFor={`${s}Checked`}>{s}</FilterButton>
              </Fragment>
            ) )
          }
        </HeaderFilter>
      </HeaderFilters>
    </HeaderContainer>
  );
}

export default withFilters(Header);