import updateBeerList from './beer-list';
import updateAppliedFilters from './filters';   

const reducer = (state, action) => {
  return {
    beerList: updateBeerList(state, action),
    appliedFilters: updateAppliedFilters(state, action)
  }
}

export default reducer;