import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchQuote } from './actions/fetchActions';
import { addFavorite, getFavorites, deleteFavorite } from './actions/favoriteActions';

import Header from './components/Header';
import HomePage from './pages/HomePage';
import SearchPage from './pages/SearchPage';
import FavoritesPage from './pages/FavoritesPage';

class App extends Component {

  componentDidMount() {
    const { fetchQuote, getFavorites } = this.props;
    fetchQuote();
    getFavorites();
  }

  render() {
    let { quote, isFetching, addFavorite, favorites, callingDatabase, deleteFavorite } = this.props;
    return (
        <Router>
          <div className='container'>
            <Header />
            <Route exact path='/' render={() => <HomePage quote={quote} isFetching={isFetching} addFavorite={addFavorite} callingDatabase={callingDatabase}/>} />
            <Route path='/search' component={SearchPage} />
            <Route path='/favorites' render={() => <FavoritesPage favorites={favorites} callingDatabase={callingDatabase} deleteFavorite={deleteFavorite}/>} />
          </div>
        </Router>
    );
  }
}

function mapStateToProps(state) {
  const { favorites, callingDatabase } = state.favorites;
  const { isFetching, quote } = state.quotes;
  return {
    quote,
    isFetching,
    favorites,
    callingDatabase
  }
}

function mapDispatchToProps(dispatch) {
  return {
    fetchQuote: () => dispatch(fetchQuote()),
    addFavorite: (quote) => dispatch(addFavorite(quote)),
    getFavorites: () => dispatch(getFavorites()),
    deleteFavorite: (id) => dispatch(deleteFavorite(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);