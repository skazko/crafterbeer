import testData from './test-data';
import { strip } from '../utils';

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

    const tth = attributes.map((attribute) => {
      const {id, name, options: [value]} = attribute;
      
      if (id === 1 || id === 2 || id === 3) {
        return {
          name,
          value: parseFloat(value.replace(/,/, ".").replace(/[^\d.]/g, ""))
        }
      } else {
        return { name, value };
      }
    });
    
    //описания на сайте могут содержать теги, а также неактуальные фразы о цене
    const description = strip(short_description)
      .replace(/\r?\n/g, '')
      .replace(/Цена указана.+/, '')
      || 'Описания этого сорта пока что нет, попробуйте и расскажите нам как оно.';

    return {
      id,
      name,
      slug,
      description,
      price: parseInt(price),
      inStock: stock_status === 'instock' ? true : false,
      imgSrc,
      imgAlt: imgAlt || imgName,
      tth
    }
  }
}
