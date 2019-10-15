import testData from './test-data';

export default class CrafterbeerService {

  get() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const beerData = testData.map(this._transformBeerData);
        resolve(beerData);
      }, 700);
    });
  }

  _transformBeerData = (beerItem) => {
    const {
      attributes, 
      id, 
      name, 
      slug, 
      short_description, 
      price, 
      stock_status,
      images : [{src: imgSrc, alt: imgAlt, name: imgName}]
    } = beerItem;


    // const tth = {};

    // attributes.forEach((attribute) => {
    //   switch (attribute.id) {
    //     case 2:
    //       tth.og = parseFloat(attribute.options[0].replace(/%/g, "").replace(/,/, "."));
    //       break;
    //     case 1: 
    //       tth.abv = parseFloat(attribute.options[0].replace(/%/g, "").replace(/,/, "."));
    //       break;
    //     case 3:
    //       tth.ibu = parseFloat(attribute.options[0].replace(/,/, ".").replace(/[^\d.]/g, ""));
    //       break;
    //     case 6:
    //       tth.style = attribute.options[0];
    //       break;
    //     case 7:
    //       tth.brewery = attribute.options[0];
    //       break;
    //     default:
    //       break;
    //   }
    // });

    const tth = attributes.map((attribute) => {
      const {id, name, options: [value]} = attribute;
      switch (id) {
        case 1:
        case 2:
        case 3:
          return {
            name,
            value: parseFloat(value.replace(/,/, ".").replace(/[^\d.]/g, ""))
          };
        case 6:
        case 7:
          return { name, value };
        default:
          break;
      }
    });

    // const {
    //   og = null, 
    //   abv = null, 
    //   ibu = null, 
    //   style = null, 
    //   brewery = null
    // } = tth;

    return {
      id,
      name,
      slug,
      description: short_description,
      price: parseInt(price),
      inStock: stock_status === 'instock' ? true : false,
      imgSrc,
      imgAlt: imgAlt || imgName,
      tth
      // og,
      // abv,
      // ibu,
      // style,
      // brewery
    }
  }
}
