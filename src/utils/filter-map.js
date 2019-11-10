import Taplist from '../classes';


export default class FilterMap {


  constructor(beers, appliedFilters) {

    const b = new Taplist(beers);

    this.styles = b.getStylesFilter(appliedFilters);
    this.breweries = b.getBreweryFilter(appliedFilters);
    this.minAlc = b.minAlc;
    this.maxAlc = b.maxAlc;
    
  }
  
}