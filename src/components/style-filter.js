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

  :disabled + label {
    opacity: 0.3;
  }
`;

const StyleFilter = ({styles, updateStyleFilter}) => {

  const stylesItems = styles.map((style) => {
    const styleName = style[0];
    const { quantity, isChecked } = style[1];
    const filterId = `${styleName.replace(/\s/g, '')}Filter`;
    return (
      <StyleListItem key={styleName}>
        <StyleCheckbox
          onChange={(e) => updateStyleFilter(styleName, e.target.checked)} 
          id={filterId} 
          type="checkbox"
          checked={isChecked}
          disabled={quantity === 0} />
        <FilterButton htmlFor={filterId}>
          {styleName}<span> - {quantity}</span>
        </FilterButton>
      </StyleListItem>
    )
  });

  return <FilterList>{stylesItems}</FilterList>;
}

export default StyleFilter;