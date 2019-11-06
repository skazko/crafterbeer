export default class FilterMap {
  constructor(beers, appliedFilters) {
    
    const calculateQuantity = (filterMap, filter) => {
      let count;
      if (filterMap.has(filter)) {
        count = filterMap.get(filter).quantity;
      } else {
        count = 0;
      }
      count += 1;
      return count;
    }
    
    const beersToStyleFilter = (beers) => {
      const styles = new Map();
      beers.forEach(({style}) => {
        styles.set(style, {
          quantity: calculateQuantity(styles, style), 
          isChecked: false
        });
      });
      return styles;
    }
    
    const beersToBreweryFilter = (beers) => {
      const breweries = new Map();
      beers.forEach(({brewery, breweryImg}) => {
        breweries.set(brewery, {
          quantity: calculateQuantity(breweries, brewery), 
          img: breweryImg, 
          isChecked: false
        });
      });
      return breweries;
    }
    
    const calculateAvailableQuantity = (initial, available) => {
      const output = new Map(initial)
      for (let filter of output) {
        const [name, props] = filter;
        if (available.has(name)) {
          const {quantity} = available.get(name);
          output.set(name, {...props, quantity});
        } else {
          output.set(name, {...props, quantity: 0});
        }
      }
      return output;
    }
    
    const markCheckedFilters = (filters, filterName, appliedFilters) => {
      const output = new Map(filters);
      if (appliedFilters.needToApply.has(filterName)) {
        for (let filter of output.keys()) {
          if (appliedFilters[filterName].has(filter)) {
            const filterProp = output.get(filter);
            output.set(filter, {...filterProp, isChecked: true});
          }
        }
      }
      return output;
    }

    const applyAlcFilter = (beers, {maxAlc, minAlc}) => {
      return beers.filter((beer) => beer.alc >= minAlc && beer.alc <= maxAlc);
    };
    
    const applyBreweryFilter = (beers, {needToApply, breweries}) => {
      if (needToApply.has('breweries')) {
        return beers.filter((beer) => breweries.has(beer.brewery))
      } 
      return beers; 
    };
    
    const applyStyleFilter = (beers, {needToApply, styles}) => {
      if (needToApply.has('styles')) {
        return beers.filter((beer) => styles.has(beer.style))
      }
      return beers;
    };

    const beersAfterAlcFilter = applyAlcFilter(beers, appliedFilters);
    const initialStyles = beersToStyleFilter(beers);
    const availableStyles = beersToStyleFilter(applyBreweryFilter(beersAfterAlcFilter, appliedFilters));
    const stylesToMark = calculateAvailableQuantity(initialStyles, availableStyles);

    this.styles = markCheckedFilters(stylesToMark, 'styles', appliedFilters);

    const initialBreweries = beersToBreweryFilter(beers);
    const availableBreweries = beersToBreweryFilter(applyStyleFilter(beersAfterAlcFilter, appliedFilters));
    const breweriesToMark = calculateAvailableQuantity(initialBreweries, availableBreweries);

    this.breweries = markCheckedFilters(breweriesToMark, 'breweries', appliedFilters);

    this.minAlc = beers.reduce((min, beer) => {
      const alc = beer.features.find(feature => feature.name === 'abv');
      return alc.value < min ? alc.value : min;
    }, 100);

    this.maxAlc = beers.reduce((max, beer) => {
      const alc = beer.features.find(feature => feature.name === 'abv');
      return alc.value > max ? alc.value : max;
    }, 0);
    
  }
  
}