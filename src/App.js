import React, {Component } from 'react';
import './App.css';
import CrafterbeerService from './service/crafterbeerService';
 

export default class App extends Component {
  state = {
    data: null,
    loading: true,
    error: false
  }

  api = new CrafterbeerService();

  componentDidMount() {
    this.api.get()
      .then((data) => {
        console.log("Response Data:", data);
        this.setState({
          data,
          loading: false,
          error: false
        });
      })
      .catch(() => {
        console.log("Error");
        this.setState({
          loading: false,
          error: true
        });
      });
  }
  
  render() {

    const { data, loading, error } = this.state;
    
    if (loading) {
      return (
        <div className="App">
          <header className="App-header">
            <h1>loading...</h1>
          </header>
        </div>
      );
    }

    if (error) {
      return (
        <div className="App">
          <header className="App-header">
            <h1>Error!</h1>
          </header>
        </div>
      );
    }

    const renderedData = data
      .sort((item1, item2) => {
        if (item1.brewery === item2.brewery) {
          return 0;
        } else {
          return (item1.brewery > item2.brewery) ? 1 : -1;
        }
      })
      .map((item) => {
        const {id, imgSrc, imgAlt, name, description, tth} = item;
        return (
          <li className="beer" key={id}>
            <div className="beer__image">
              <img className="beer-image" src={imgSrc} alt={imgAlt} />
            </div>
            <div className="beer__information">
              <h3 className="beer__title">{name}</h3>
              <p className="beer__description">{description}</p> 
              <h4>Характеристики:</h4>
              <table className="beer__features">
                {
                  tth.map(({ name, value }) => {
                    return (
                      <tr className="beer__feature" key={id + name + value}>
                        <td className="beer__features-term">{name}</td>
                        <td className="beer__features-value">{value}</td>
                      </tr>
                    );
                  })
                }
              </table>
            </div>
          </li>
        );
      });
  
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="page-title">Сегодня на кранах:</h1>
          <ul className="beer-list">
            {renderedData}
          </ul>
        </header>
      </div>
    );
  }
}
