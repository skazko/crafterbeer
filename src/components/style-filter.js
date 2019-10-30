import React from 'react';
import styled from 'styled-components';
import { FilterCheckbox, FilterButton, FilterList } from './filter-styled';

const StyleListItem = styled.li`
  display: inline-block;
`;

const StyleCheckbox = styled(FilterCheckbox)`
  :checked + label {
    background-color: #d5d5d5;
  }

  :focus + label {
    outline: rgb(59, 153, 252) auto 5px;
  }
`;

const StyleFilter = ({styles, updateStyleFilter}) => {

  const stylesItems = styles.map((style) => (
      <StyleListItem key={style[0]}>
        <StyleCheckbox
          onChange={(e) => updateStyleFilter(style[0], e.target.checked)} 
          id={`${style[0].replace(/\s/g, '')}Filter`} 
          type="checkbox" />
        <FilterButton htmlFor={`${style[0].replace(/\s/g, '')}Filter`}>
          {style[0]}<span> - {style[1]}</span>
        </FilterButton>
      </StyleListItem>
    ) );

  return <FilterList>{stylesItems}</FilterList>;
}

export default StyleFilter;