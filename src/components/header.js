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

const FilterButton = styled.label`
  padding: 5px;
  cursor: pointer;
  border: 1px solid grey;
  display: inline-block;
  margin: 0 10px 10px 0;
`;


const Header = ({ filters, styleButtonHandler }) => {

  const styles = [...filters.styles];

  return (
    <HeaderContainer>
      <HeaderLogo></HeaderLogo>
      <HeaderFilters>
        <HeaderFilter id="styles">
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
      </HeaderFilters>
    </HeaderContainer>
  );
}

export default withFilters(Header);