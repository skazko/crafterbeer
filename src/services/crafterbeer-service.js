import testData from './test-data';
import testImages from './test-images';
import { strip } from '../utils';

export default class CrafterbeerService {

  async get() {
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const targetUrl = 'https://crafterbeer.ru/wp-admin/admin-ajax.php?action=test-ajax';

    try {
      const res = await fetch(proxyUrl + targetUrl);
      if (res.ok) {
        return await res.json();
      } else {
        console.error('Response status: ', res.status);
        console.error('Test data will be loaded');
        return this.getTestData();
      }
    } catch {
      console.error(proxyUrl + ' is unavailable, test data will be loaded');
      return this.getTestData();
    }
  }

  getTestData() {
    return new Promise((resolve) => {
      setTimeout(() => {
        const beerData = testData.map(this._transformBeerData);
        resolve(beerData);
      }, 500);
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

    let alc;
    if (attributes.findIndex(({ id }) => id === 1) >= 0) {
      alc = parseFloat(attributes.find(({ id }) => id === 1).options[0].replace(/,/, ".").replace(/[^\d.]/g, ""));
    } else {
      alc = null;
    }

    let og;
    if (attributes.findIndex(({ id }) => id === 2) >= 0) {
      og = parseFloat(attributes.find(({ id }) => id === 2).options[0].replace(/,/, ".").replace(/[^\d.]/g, ""));
    } else {
      og = null;
    }

    let ibu;
    if (attributes.findIndex(({ id }) => id === 3) >= 0) {
      ibu = parseFloat(attributes.find(({ id }) => id === 3).options[0].replace(/,/, ".").replace(/[^\d.]/g, ""));
    } else {
      ibu = null;
    }
    
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
      brewery,
      breweryImg,
      style,
      alc, og, ibu
    }
  }
}
