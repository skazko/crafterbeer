function strip(html){
  const tmp = document.createElement('div');
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText;
}

function beergroundColor(style) {
  const back = backColor(style);
  return {
    backColor: back,
    frontColor: frontColor(back),
    shadowString: shadowString(back)
  }
}

function frontColor(hexColor) {
  const r = parseInt(hexColor.slice(1, 3), 16);
  const g = parseInt(hexColor.slice(3, 5), 16);
  const b = parseInt(hexColor.slice(5, 7), 16);

  if ((r*0.299 + g*0.587 + b*0.114) > 186) {
    return '#000000';
  } else {
    return '#FFFFFF';
  }
}

function backColor(style) {
  switch (style) {
    case 'Milkshake DIPA':
      return '#adff2f';

    case 'Belgian Blond':
      return '#c6751c';

    case 'Belgian Dubbel':
      return '#9c5d1a';  

    case 'Sour':
      return '#f3399a'; 

    case 'APA':
      return '#00fa9a'; 

    case 'Světlý ležák':
    case 'Czech Pilsner':
    case 'Helles':
      return '#ffd366';
      
    case 'Cider':
      return '#ffd9aa';

    case 'Stout':
      return '#834f32';

    case 'DIPA':
    case 'Triple IPA':
      return '#299617';
      
    case 'Cherry beer':
      return '#9f4d65';

    case 'NEIPA':
      return '#19a833';

    case 'IPA':
      return '#829a00';

    case 'Weizen':
    case 'Blanche':
      return '#fcc460';

    case 'Gose':
      return '#f4bbff';

    case 'Rye beer':
      return '#ae7646';
      
    default:
      return '#f28e1c';
  }
}

function shadowString(hex) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);

  let color;

  if ((r*0.299 + g*0.587 + b*0.114) < 186) {
    color = '#000000';
    return `0 -2px 1px ${color}, 
            0 -2px 1px ${color}, 
            0 2px 1px ${color}, 
            0 2px 1px ${color}, 
            -2px 0 1px ${color}, 
            2px 0 1px ${color}, 
            -2px 0 1px ${color}, 
            2px 0 1px ${color}, 
            -1px -2px 1px ${color}, 
            1px -2px 1px ${color}, 
            -1px 2px 1px ${color}, 
            1px 2px 1px ${color}, 
            -2px -1px 1px ${color}, 
            2px -1px 1px ${color}, 
            -2px 1px 1px ${color}, 
            2px 1px 1px ${color}, 
            -2px -2px 1px ${color}, 
            2px -2px 1px ${color}, 
            -2px 2px 1px ${color}, 
            2px 2px 1px ${color}, 
            -2px -2px 1px ${color}, 
            2px -2px 1px ${color}, 
            -2px 2px 1px ${color}, 
            2px 2px 1px ${color}`
  }
  
  return '';
}

const compose = (...funcs) => (comp) => {
  return funcs.reduceRight((wrapped, f) => f(wrapped), comp);
}; 

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

const filterBeers = (beers, appliedFilters) => {
  const { needToApply, styles, breweries, maxAlc, minAlc } = appliedFilters;
  return beers
          .filter((beer) => needToApply.has('styles') ? styles.has(beer.style) : true)
          .filter((beer) => needToApply.has('breweries') ? breweries.has(beer.brewery) : true)
          .filter((beer) => beer.alc >= minAlc && beer.alc <= maxAlc)
} 


export {
  strip,
  beergroundColor,
  compose,
  filterBeers,
  applyAlcFilter,
  applyBreweryFilter,
  applyStyleFilter
}