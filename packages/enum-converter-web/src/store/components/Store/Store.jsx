import React, { Component } from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import converterReducer from '../../../convert/reducers/converter.reducer';
import logger from 'redux-logger';
import reduxPromise from 'redux-promise';

export const store = createStore(
  converterReducer,
  process.env.NODE_ENV === 'production'
    ? applyMiddleware(reduxPromise)
    : applyMiddleware(reduxPromise, logger)
);

class Store extends Component {
  render() {
    return <Provider store={store}>{this.props.children}</Provider>;
  }
}

export default Store;
