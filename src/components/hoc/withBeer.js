import React, { Component } from 'react';
import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner';


const withBeer = (View) => {
  return class extends Component {
    state = {
      beers: null,
      loading: true,
      error: false
    }

    update() {
      this.props.api.get()
        .then((beers) => {
          this.setState({
            beers,
            loading: false
          });
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
      const {beers, loading, error} = this.state;
      if (error) { return <ErrorIndicator /> }
      if (loading) { return <Spinner /> }
      
      return <View {...this.props} beers={beers} />

    }

  }
}

export default withBeer;