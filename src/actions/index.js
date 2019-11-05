const beersRequested = () => {
  return {
    type: 'BEERS_FETCH_REQUEST'
  };
};

const beersLoaded = (newBeers) => {
  return {
    type: 'BEERS_FETCH_SUCCESS',
    payload: newBeers
  };
};

const beersError = (error) => {
  return {
    type: 'BEERS_FETCH_FAILURE',
    payload: error
  }
}

const beersFetch = (crafterbeerService, dispatch) => () => {
  dispatch(beersRequested());
  crafterbeerService.get()
    .then((data) => dispatch(beersLoaded(data)))
    .catch((err) => dispatch(beersError(err)));
}

const updateStyleFilter = (style, isChecked) => {
  return {
    type: 'UPDATE_STYLE_FILTER',
    payload: {item: style, isChecked}
  }
}

const updateBreweryFilter = (brewery, isChecked) => {
  return {
    type: 'UPDATE_BREWERY_FILTER',
    payload: {item: brewery, isChecked}
  }
}

const updateAlcFilter = ({maxAlc, minAlc}) => {
  return {
    type: 'UPDATE_ALC_FILTER',
    payload: {maxAlc, minAlc}
  }
}

const clearFilters = () => {
  return {
    type: 'CLEAR_FILTERS'
  }
}

const sortBeersHandler = (sortOption) => {
  console.log('sort action');
  
  return {
    type: 'SORT_BEERS',
    payload: sortOption
  }
}

export {
  beersFetch,
  updateStyleFilter,
  updateBreweryFilter,
  updateAlcFilter,
  clearFilters,
  sortBeersHandler
}