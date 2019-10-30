import styled from 'styled-components';

const FilterCheckbox = styled.input`
  position: absolute;
  width: 1px;
  height: 1px;
  margin: -1px;
  border: 0;
  padding: 0;
  clip: rect(0 0 0 0);
  overflow: hidden;
`;

const FilterButton = styled.label`
  padding: 5px;
  cursor: pointer;
  border: 1px solid grey;
  display: inline-block;
  margin: 0 10px 10px 0;
`;

const FilterList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
`;

export {
  FilterCheckbox,
  FilterButton,
  FilterList
}