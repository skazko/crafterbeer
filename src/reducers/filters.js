const updateAppliedFilters = (state, action) => {
  if (state === undefined) {
    return {
      needToApply: new Set(),
      styles: new Set(),
      breweries: new Set(),
      maxAlc: 100,
      minAlc: 0
    }
  }

  function updateFilter(payload, filter) {
    const { appliedFilters } = state;
    const { item, isChecked } = payload;
    const filterToUpdate = new Set(appliedFilters[filter]);

    console.log('appliedFilters[filter]: ' + appliedFilters[filter] );
    
    const needToApply = new Set(appliedFilters.needToApply);

    if (isChecked) {
      needToApply.add(filter); 
      filterToUpdate.add(item);

    } else {
      filterToUpdate.delete(item);
      if (filterToUpdate.size === 0) {
        needToApply.delete(filter);
      }
    }

    return {...appliedFilters, needToApply, [filter]: filterToUpdate}

  }

  switch (action.type) {
    case 'UPDATE_STYLE_FILTER':
      return updateFilter(action.payload, 'styles');

      case 'UPDATE_BREWERY_FILTER':
        return updateFilter(action.payload, 'breweries')

    default: 
      return state.appliedFilters;
  }

  
}

export default updateAppliedFilters;