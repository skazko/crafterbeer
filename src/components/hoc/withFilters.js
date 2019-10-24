import React, { Component } from 'react';
import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner';


const withFilters = (View) => {
  return class extends Component {
    state = {
      filters: null,
      loading: true,
      error: false
    }

    update() {
      this.props.api.get()
        .then((beers) => {
          const styles = new Set(beers.map((beer) => beer.style));
          const breweries = new Map(beers.map((beer) => [beer.brewery, beer.breweryImg]));
          const minAlc = beers.reduce((min, beer) => {
            const alc = beer.features.find(feature => feature.name === 'abv');
            return alc.value < min ? alc.value : min;
          }, 100);

          const maxAlc = beers.reduce((max, beer) => {
            const alc = beer.features.find(feature => feature.name === 'abv');
            return alc.value > max ? alc.value : max;
          }, 0);
          
          const filters = {
            styles,
            breweries,
            minAlc,
            maxAlc
          }

          this.setState({
            filters,
            loading: false
          })


        })
        .catch(() => {
          this.setState({
            error: true,
            loading: false
          });
        });
    }

    componentDidMount() {
      this.update();
    }

    componentDidUpdate(prevProps) {
      if (this.props.get !== prevProps.get) {
        this.update();
      }
    }

    render() {
      const {filters, loading, error} = this.state;
      if (error) { return <ErrorIndicator /> }
      if (loading) { return <Spinner /> }
      
      return <View {...this.props} filters={filters} />

    }

  }
}

export default withFilters;