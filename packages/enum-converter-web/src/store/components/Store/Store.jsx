import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import reduxPromise from 'redux-promise';
import converterReducer from '../../../convert/reducers/converter.reducer';

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
