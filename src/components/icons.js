import React from 'react';
import Icon from '@mdi/react';
import { mdiFilterMenuOutline } from '@mdi/js';
import { mdiSort } from '@mdi/js';

const FilterIcon = () => {
  return (
    <Icon path={mdiFilterMenuOutline}
    title="Filter"
    size={1}/>
  );
};

const SortIcon = () => {
  return (
    <Icon path={mdiSort}
    title="Sorting"
    size={1}/>
  );
}

export {
  FilterIcon,
  SortIcon
}