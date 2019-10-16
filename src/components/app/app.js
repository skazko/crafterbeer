import React, { Component } from 'react';
import BeerItem from '../beer-item';
import CrafterbeerService from '../../service/crafterbeer-service'; 
import './app.css';

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
        console.log(data);
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
    const { loading, error, data } = this.state;
    if (loading) {
      return <h1>Loading...</h1>
    }
    if (error) {
      return <h1>Error!!!</h1>
    }
    return (
      <div className="dev-container">
        <ul>
          <BeerItem item={data[2]} />
        </ul>
      </div>
    )
  }
}
