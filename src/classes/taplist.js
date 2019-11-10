import Filters from './filters';

export default class Taplist {

  /**
   * Create Taplist object
   * 
   * @param {Array} beers 
   */
  constructor(beers) {
    this.beers = beers;
    this.styles = this._getInitialStyles(beers);
    this.breweries = this._getInitialBreweries(beers);
    this.maxAlc = this._getMaxAlc(beers);
    this.minAlc = this._getMinAlc(beers);
  }

  /**
   * Find max alcohol value
   * 
   * @param {Array} beers - initial array of beers from api
   * @return {number} The max alcohol value
   */
  _getMaxAlc(beers) {
    return beers.reduce((max, beer) => {
      return beer.alc > max ? beer.alc : max;
    }, 0);
  }

  /**
   * Find min alcohol value
   * 
   * @param {Array} beers - initial array of beers from api
   * @return {number} The min alcohol value
   */
  _getMinAlc(beers) {
    return beers.reduce((min, beer) => {
      return beer.alc < min ? beer.alc : min;
    }, 100);
  }

  /**
   * Create initial styles Map collection.
   * Each collection item consist of: key - represent style name
   * value - object with properties: quantity - represent number of beers mathing the style 
   * 
   * @param {Array} beers - initial array of beers from api
   * @return {Map} - Map collection of all styles
   */

  _getInitialStyles(beers) {
    const styles = new Map();
    beers.forEach(({style}) => {
      styles.set(style, {
        quantity: this._count(styles, style), 
        isChecked: false
      });
    });
    return styles;
  }

  /**
   * Create Initial breweries Map collection.
   * 
   * @param {Array} beers - initial array of beers from api
   * @return {Map} - Map collection of all breweries
   */

  _getInitialBreweries(beers) {
    const breweries = new Map();
    beers.forEach(({brewery, breweryImg}) => {
      breweries.set(brewery, {
        quantity: this._count(breweries, brewery), 
        img: breweryImg, 
        isChecked: false
      });
    });
    return breweries;
   }

  /**
   * Calculate beers quantity matching filter name. 
   *
   * @param {Map} filterMap - Map collection of filter items.
   * @param {string} filter - filter item name.
   * @return {number} - updated quantity of matching beers
   */

  _count(filterMap, filter) {
    let count;
    if (filterMap.has(filter)) {
      count = filterMap.get(filter).quantity;
    } else {
      count = 0;
    }
    count += 1;
    return count;
  }

   /**
    * Create new Taplist from current Beers by applying Alc filter
    * 
    * @param {Array} beers - array of beers before filter 
    * @param {Object} appliedFilters - applied filters includes maxAlc and minAlc values
    * @param {number} appliedFilters.maxAlc - top alcohol value setted by user
    * @param {number} appliedFilters.minAlc - low alcohol value setted by user
    * @return {Taplist}
    */

  _applyAlcFilter(beers, appliedFilters) {
    const {maxAlc, minAlc} = appliedFilters;
    const newBeers = beers.filter((beer) => beer.alc >= minAlc && beer.alc <= maxAlc);
    return new Taplist(newBeers);
  }

  /**
   * Helping func that return new Taplist by applying filter in Set collections.
   * If no filter applied (set collection is empty) return all beers
   * 
   * @param {Array} beers - array of beers before filter
   * @param {Set} filterSet - Set collection of applied filter values
   * @param {string} filterName - name of the filter to get values from beer objects
   * @return {Taplist} 
   */

  _applyFilter(beers, filterSet, filterName) {
    let newBeers;
    if (filterSet.size !== 0) {
      newBeers = beers.filter((beer) => filterSet.has(beer[filterName]));
    } else {
      newBeers = beers;
    }
    return new Taplist(newBeers);
  }

  /**
   * Create new Taplist from current by applying Brewery filter set collection.
   * If no brewery filter applied return all beers
   * 
   * @param {Array} beers - array of beers before filter
   * @param {Object} appliedFilters - applied filters
   * @param {Set} appliedFilters.breweries - Set collection of brewery names
   * @return {Taplist} 
   */

  _applyBreweryFilter = (beers, appliedFilters) => {
    const {breweries} = appliedFilters;
    return this._applyFilter(beers, breweries, 'brewery');
  }

  /**
   * Create new Taplist from current by applying Style filter set collection.
   * If no style filter applied return all beers
   * 
   * @param {Array} beers - array of beers before filter
   * @param {Object} appliedFilters - applied filters
   * @param {Set} appliedFilters.styles - Set collection of style names
   * @return {Taplist} 
   */

  _applyStyleFilter = (beers, appliedFilters) => {
    const {styles} = appliedFilters;
    return this._applyFilter(beers, styles, 'style');
  }

  /**
   * Array of filter functions
   */

  filters = [this._applyAlcFilter, this._applyBreweryFilter, this._applyStyleFilter]

  /**
   * Helping function: apply all filter functions beside one
   * to filter beers. This give possibility to count available beers for current
   * filter section (breweries or styles)
   * 
   * @param {Function} filterToExclude - filter function to exclude from applying
   * @param {Object} appliedFilters - filter options choosen by user
   * @this {Taplist} 
   * @return {Array} Filtered beers array
   */

  _applyFiltersBeside(filterToExclude, appliedFilters) {
    
    return this.filters.reduce((newBeers, applyFilter) => {
      if (applyFilter === filterToExclude) {    
        return newBeers;  
      } 
      return applyFilter(newBeers, appliedFilters).beers
    }, this.beers)
  }

  _getAvailableStyles(appliedFilters) {   
    const availableBeers = this._applyFiltersBeside(this._applyStyleFilter, appliedFilters);
    return this._getInitialStyles(availableBeers);
  }

  _getAvailableBreweries(appliedFilters) {
    const availableBeers = this._applyFiltersBeside(this._applyBreweryFilter, appliedFilters);
    return this._getInitialBreweries(availableBeers);
  }

  /**
   * Create styles filter Map collection from beers after applying all filters besides
   * style filter. Compare this collection with initial collection (before any filtering)
   * If any style is unavailable now, than set it quantity prop (available beers) to 0
   * Check if any style was checked by user - mark this items.
   * 
   * @param {Object} appliedFilters - filter options choosen by user
   * @this {Taplist}
   * @return {Map} Breweries Map collection ready to render;
   */

  getStylesFilter(appliedFilters) {
    const styles = new Filters(this._getAvailableStyles(appliedFilters)); 
    return styles.setCounts(this.styles)
                 .markChecked(appliedFilters.styles)
                 .filters;
  }

  /**
   * Create breweries filter Map collection from beers after applying all filters besides
   * brewery filter. Compare this collection with initial collection (before any filtering)
   * If any brewery is unavailable now, than set it quantity prop (available beers) to 0
   * Check if any brewery was checked by user - mark this items.
   * 
   * @param {Object} appliedFilters - filter options choosen by user
   * @this {Taplist}
   * @return {Map} Breweries Map collection ready to render;
   */

  getBreweryFilter(appliedFilters) {
    const breweries = new Filters(this._getAvailableBreweries(appliedFilters)); 
    return breweries.setCounts(this.breweries)
                    .markChecked(appliedFilters.breweries)
                    .filters;
  }
}