import updateBeerList from './beer-list';
import updateAppliedFilters from './filters';   
import sortBeers from './sorting';

const reducer = (state, action) => {
  return {
    beerList: updateBeerList(state, action),
    appliedFilters: updateAppliedFilters(state, action),
    sortingOption: sortBeers(state, action)
  }
}

export default reducer;