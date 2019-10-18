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

    transform(beers) {

    }

    update() {
      this.props.api.get()
        .then((beers) => {
          const styles = new Set(beers.map((beer) => beer.style));
          // const breweries = new Set(beers.map((beer) => beer.brewery));

          // const extremums = beers.reduce((findedValues, beer) => {
          //   const features = beer.features;
          //   const ibu = features.find((feature) => feature.name === 'ibu').value;
          //   const abv = features.find((feature) => feature.name === 'abv').value;
          //   return {
          //     alc: {
          //       max: Math.max(findedValues.alc.max, abv),
          //       min: Math.min(findedValues.alc.min, abv)
          //     },
          //     ibu: {
          //       max: Math.max(findedValues.ibu.max, ibu),
          //       min: Math.min(findedValues.ibu.min, ibu)
          //     }
          //   }
          // },{alc: {min: 10, max: 0}, ibu: {min: 100, max: 0}});
          
          const filters = {
            styles,
            // breweries,
            // alc: extremums.alc,
            // ibu: extremums.ibu
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