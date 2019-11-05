import React from 'react';
import Icon from '@mdi/react';
import { mdiFilterMenuOutline } from '@mdi/js';
import { mdiSort } from '@mdi/js';
import { mdiWindowClose } from '@mdi/js';
import { mdiPlus } from '@mdi/js';
import { mdiSortAlphabeticalAscending } from '@mdi/js';
import { mdiSortAlphabeticalDescending } from '@mdi/js';
import { mdiSortAscending } from '@mdi/js';
import { mdiSortDescending } from '@mdi/js';

const DescIcon = () => {
  return (
    <Icon path={mdiSortDescending}
    title="Filter"
    size={1}/>
  );
}

const AscIcon = () => {
  return (
    <Icon path={mdiSortAscending}
    title="Filter"
    size={1}/>
  );
}

const ABAscIcon = () => {
  return (
    <Icon path={mdiSortAlphabeticalAscending}
    title="Filter"
    size={1}/>
  );
}

const ABDescIcon = () => {
  return (
    <Icon path={mdiSortAlphabeticalDescending}
    title="Filter"
    size={1}/>
  );
}

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

const CloseIcon = () => {
  return (
    <Icon path={mdiWindowClose}
    title="Close"
    size={1}/>
  );
}

const PlusIcon = ({rotate}) => {
  return (
    <Icon path={mdiPlus}
    title="Plus"
    size={1}
    rotate={rotate}/>
  );
}

export {
  FilterIcon,
  SortIcon,
  CloseIcon,
  PlusIcon,
  DescIcon,
  AscIcon,
  ABAscIcon,
  ABDescIcon
}