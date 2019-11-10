export default class Filters {
  constructor(filters) {
    this.filters = filters;
  }

  /**
   * Check available beers quantity for filter item of this.filters
   * if filter name is not in this filters return 0
   * 
   * @param {string} name - Name of filter Item (i.e 'stout')
   * @this {Filters} 
   */
  _getAvailableCount = (name) => {
    if (this.filters.has(name)) {
      return this.filters.get(name).quantity;
    } 
    return 0;
  }

  /**
   * Set correct quantity of matching beers that available for the applied filters.
   * i.e initially 'Stout' filter for style set 
   * 
   * @param {Array} filter - Item of Map collection (brewery or style item)
   * @param {string} filter[0] - Name of filter item (name of brewery or style)
   * @param {Object} filter[1] - Object with filter item properties
   * @param {number} filter[1].quantity - Quantity of beers matching to this filter
   * @return {Array} - new filter item with correct quantity
   */

  _setAvailableBeersCount(filter) {
    const [name, props] = filter;
    const newCount = this._getAvailableCount(name);
    return [name, {...props, quantity: newCount}];
  }

  /**
   * Take all items from initial state and update quantity of available
   * beers for each filter item set 0 for unavailable items.
   * 
   * @param {Map} initial - initial filter items Map collection  
   * @return {Filters}
   */

  setCounts(initial) {
    const output = new Map(initial);
    for (let filter of output) {
      const [name, props] = this._setAvailableBeersCount(filter);
      output.set(name, props);
    }
    return new Filters(output);
  }  

  markChecked(applied) {
    const output = new Map(this.filters);
    if (applied.size !== 0) {
      for (let name of output.keys()) {
        if (applied.has(name)) {
          const filterProps = output.get(name);
          output.set(name, {...filterProps, isChecked: true});
        }
      }
    }
    return new Filters(output);
  }
}
