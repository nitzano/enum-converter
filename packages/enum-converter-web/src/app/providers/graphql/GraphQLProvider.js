import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { client } from './apollo-client';

class GraphQLProvider extends Component {
  render() {
    return (
      <ApolloProvider client={client}>{this.props.children}</ApolloProvider>
    );
  }
}

GraphQLProvider.propTypes = {};

export default GraphQLProvider;
