import React, { Component, Fragment } from 'react';
import BeerList from '../beer-list';
import Header from '../header';
import './app.css';
import { connect } from 'react-redux';
import { compose } from '../../utils';
import { beersFetch } from '../../actions';
import withCrafterbeerService from '../hoc/withCrafterbeerService';
import ErrorIndicator from '../error-indicator';
import Spinner from '../spinner';


class App extends Component {

  render() {
    return (
      <Fragment>
        <Header />
        <BeerList />
      </Fragment>
    );
  }
}

class AppContainer extends Component {
  componentDidMount() {
    this.props.beersFetch();
  }
  render() {
    const { loading, error } = this.props;
    if (error) { return <ErrorIndicator /> }
    if (loading) { return <Spinner /> }

    return <App />
  }
}

const mapStateToProps = ({beerList: {beers, loading, error}}) => {
  return {beers, loading, error}
}
const mapDispatchToProps = (dispatch, { crafterbeerService }) => {
  return { beersFetch: beersFetch(crafterbeerService, dispatch)}
}

export default compose(
  withCrafterbeerService(),
  connect(mapStateToProps, mapDispatchToProps)
)(AppContainer);

