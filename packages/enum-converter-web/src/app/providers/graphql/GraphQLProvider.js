import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { apolloClient } from './apollo-client';

class GraphQLProvider extends Component {
  render() {
    return (
      <ApolloProvider client={apolloClient}>
        {this.props.children}
      </ApolloProvider>
    );
  }
}

GraphQLProvider.propTypes = {};

export default GraphQLProvider;
