const updateBeerList = (state, action) => {
  if (state === undefined) {
    return {
      beers: [],
      loading: true,
      error: null,
    }
  }

  switch(action.type) {
    case 'BEERS_FETCH_REQUEST':
      return {
        beers: [],
        loading: true,
        error: null
      };

    case 'BEERS_FETCH_SUCCESS':
      return {
        beers: action.payload,
        loading: false,
        error: null
      };

    case 'BEERS_FETCH_FAILURE':
      return {
        beers: [],
        loading: false,
        error: action.payload
      };

    default: 
      return state.beerList;
  }
}

export default updateBeerList;