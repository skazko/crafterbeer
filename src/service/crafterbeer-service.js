import testData from './test-data';
import testImages from './test-images';
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

  // Пивоварни в свойствах testData не имеют картинок. 
  // Картинки получаем из категорий (пивоварни) бутылочного пива
  // в случае совпадения названий. Названия могут незначительно отличаться.

  _getImage = (brewery) => {
    let breweryImg;
    const breweryMod = brewery.toLowerCase().replace(/[\s'"`-]|brewery|пивоварня/g, '');
    const breweries = testImages.map((brewery) => brewery.name.toLowerCase().replace(/[\s'"`-]|brewery|пивоварня/g, ''));
    const breweryIndex = breweries.findIndex((brewery) => brewery === breweryMod);
    if (breweryIndex === -1) {
      breweryImg = null;
    } else {
      breweryImg = testImages[breweryIndex].image === null ? null : testImages[breweryIndex].image.src;
    }
    return breweryImg;
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

    const features = attributes
      .filter(({ id }) => id === 1 || id === 2 || id === 3)
      .map(({id, options: [value]}) => {
        const name = id === 1 ? 'abv' : id === 2 ? 'og' : 'ibu';
        return {
          name,
          value: parseFloat(value.replace(/,/, ".").replace(/[^\d.]/g, ""))
        }
      });
    
    const brewery = attributes.find(({ id }) => id === 7).options[0];
    const style = attributes.find(({ id }) => id === 6).options[0];
    const breweryImg = this._getImage(brewery);
    
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
      tth,
      features,
      brewery,
      breweryImg,
      style
    }
  }
}
